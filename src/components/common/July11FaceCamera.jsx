import React, { useRef, useEffect, useState } from 'react';
import './July11cssFaceCamera';

/**
 * FaceCamera — Government biometric scanner (FULL-SCREEN MODAL)
 *
 * Visual states:
 *   loading  → grey ring, spinner overlay
 *   scanning → blue ring + scan line (camera on, no face yet)
 *   detected → amber ring (face seen, waiting for blinks)
 *   success  → GREEN ring + green overlay + checkmark
 *   failed   → RED ring + red overlay + X mark
 *
 * Props:
 *   mode             'register' | 'verify'
 *   storedDescriptor Float32Array  (verify mode only)
 *   onCapture(base64, descriptor)   (register mode)
 *   onVerified(success, descriptor) (verify mode)
 *   onClose()                       (close the full-screen modal)
 */
export default function FaceCamera({
  onCapture,
  onVerified,
  onClose,
  mode = 'register',
  storedDescriptor = null,
}) {
  const videoRef   = useRef(null);
  const canvasRef  = useRef(null);
  const streamRef  = useRef(null);
  const timerRef   = useRef(null);
  const blinkRef   = useRef(0);
  const eyeClosedRef = useRef(false);
  const faceapiRef = useRef(null);

  // state: 'loading' | 'scanning' | 'detected' | 'success' | 'failed'
  const [uiState,   setUiState]   = useState('loading');
  const [message,   setMessage]   = useState('Loading face detection models...');
  const [blinks,    setBlinks]    = useState(0);
  const [scanLine,  setScanLine]  = useState(false);
  const [resultMsg, setResultMsg] = useState('');

  /* ── Boot: load models → start camera ── */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const fa = await import('face-api.js');
        faceapiRef.current = fa;
        const MODEL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
        await Promise.all([
          fa.nets.tinyFaceDetector.loadFromUri(MODEL),
          fa.nets.faceLandmark68TinyNet.loadFromUri(MODEL),
          fa.nets.faceRecognitionNet.loadFromUri(MODEL),
        ]);
        if (!alive) return;
        await startCamera(fa);
      } catch (e) {
        console.error(e);
        if (alive) {
          setUiState('failed');
          setResultMsg('Failed to load models. Refresh and try again.');
          setMessage('Model load error.');
        }
      }
    })();
    return () => { alive = false; stopAll(); };
    // eslint-disable-next-line
  }, []);

  const stopAll = () => {
    setScanLine(false);
    clearInterval(timerRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
  };

  const startCamera = async (fa) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 480 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setUiState('scanning');
        setScanLine(true);
        setMessage(
          mode === 'register'
            ? 'Center your face in the frame — then blink twice to register'
            : 'Look at the camera — blink twice to verify your identity'
        );
        startDetection(fa);
      }
    } catch {
      setUiState('failed');
      setResultMsg('Camera access denied.');
      setMessage('Please allow camera access and refresh.');
    }
  };

  /* ── Eye Aspect Ratio ── */
  const ear = (eye) => {
    const A = Math.hypot(eye[1].x - eye[5].x, eye[1].y - eye[5].y);
    const B = Math.hypot(eye[2].x - eye[4].x, eye[2].y - eye[4].y);
    const C = Math.hypot(eye[0].x - eye[3].x, eye[0].y - eye[3].y);
    return (A + B) / (2 * C);
  };

  const startDetection = (fa) => {
    const EAR_THRESH = 0.22;
    const NEED_BLINKS = 2;
    // Smaller inputSize = much faster detection with negligible accuracy
    // loss for a close-up webcam face — see inputSize note below.
    const detectorOptions = new fa.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 });

    timerRef.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;
      try {
        const det = await fa
          .detectSingleFace(videoRef.current, detectorOptions)
          .withFaceLandmarks(true)
          .withFaceDescriptor();

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (!det) {
          setUiState('scanning');
          setMessage('No face detected — please center your face in the frame');
          return;
        }

        /* Draw eye dots */
        const lm = det.landmarks;
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        [...lm.getLeftEye(), ...lm.getRightEye()].forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        });

        const avgEar = (ear(lm.getLeftEye()) + ear(lm.getRightEye())) / 2;

        if (blinkRef.current < NEED_BLINKS) {
          setUiState('detected');
          setMessage(`Face detected — blink ${NEED_BLINKS - blinkRef.current} more time(s)`);
        }

        /* Blink logic */
        if (avgEar < EAR_THRESH && !eyeClosedRef.current) {
          eyeClosedRef.current = true;
        } else if (avgEar >= EAR_THRESH && eyeClosedRef.current) {
          eyeClosedRef.current = false;
          blinkRef.current += 1;
          setBlinks(blinkRef.current);

          if (blinkRef.current >= NEED_BLINKS) {
            clearInterval(timerRef.current);
            setScanLine(false);

            /* Capture frame */
            const cap = document.createElement('canvas');
            cap.width  = videoRef.current.videoWidth;
            cap.height = videoRef.current.videoHeight;
            cap.getContext('2d').drawImage(videoRef.current, 0, 0);
            const base64     = cap.toDataURL('image/jpeg', 0.85);
            const descriptor = Array.from(det.descriptor);
            stopAll();

            if (mode === 'register') {
              setUiState('success');
              setResultMsg('Face Registered!');
              setMessage('Registration successful');
              onCapture && onCapture(base64, descriptor);
            } else {
              /* Verify mode */
              let matched = true;
              if (storedDescriptor && storedDescriptor.length > 0) {
                const dist = fa.euclideanDistance(descriptor, Array.from(storedDescriptor));
                matched = dist < 0.52;
              }
              if (matched) {
                setUiState('success');
                setResultMsg('Identity Verified!');
                setMessage('Face matched — attendance confirmed');
                onVerified && onVerified(true, descriptor);
              } else {
                setUiState('failed');
                setResultMsg('Face Mismatch!');
                setMessage('Your face did not match. Please try again.');
                onVerified && onVerified(false, descriptor);
              }
            }
          } else {
            setMessage(`Blink ${blinkRef.current} detected — ${NEED_BLINKS - blinkRef.current} more needed`);
          }
        }
      } catch { /* skip frame */ }
    }, 250);
  };

  /* ── Map state → CSS class ── */
  const ringClass   = `fc-ring state-${uiState}`;
  const barClass    = `fc-status-bar fc-status-${uiState}`;

  return (
    <div className="fc-backdrop">

      {/* ── Top bar ── */}
      <div className="fc-topbar">
        <span className="fc-topbar-title">
          {mode === 'register' ? 'Face Registration' : 'Face Verification'}
        </span>
        {onClose && (
          <button className="fc-close-btn" onClick={() => { stopAll(); onClose(); }} aria-label="Close">
            ✕
          </button>
        )}
      </div>

      {/* ── Camera stage ── */}
      <div className="fc-stage">
        <div className={ringClass}>
          <div className="fc-mask">
            <video ref={videoRef} className="fc-video" playsInline muted />
            <canvas ref={canvasRef} className="fc-canvas" width={640} height={480} />

            {scanLine && <div className="fc-scan-line" />}

            {uiState === 'loading' && (
              <div className="fc-overlay fc-overlay-loading">
                <div className="fc-spinner" />
              </div>
            )}

            {uiState === 'success' && (
              <div className="fc-overlay fc-overlay-result fc-overlay-success">
                <div className="fc-result-icon">✓</div>
              </div>
            )}

            {uiState === 'failed' && (
              <div className="fc-overlay fc-overlay-result fc-overlay-failed">
                <div className="fc-result-icon">✗</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom sheet ── */}
      <div className="fc-sheet">
        <div className={barClass}>{message}</div>

        {(uiState === 'scanning' || uiState === 'detected') && (
          <div className="fc-blink-row">
            {[1, 2].map(i => (
              <div key={i} className={`fc-blink-dot ${blinks >= i ? 'done' : ''}`}>
                <div className="fc-blink-circle">{blinks >= i ? '✓' : i}</div>
                <div className="fc-blink-label">Blink {i}</div>
              </div>
            ))}
            <div className="fc-blink-count">{blinks} / 2</div>
          </div>
        )}

        {(uiState === 'success' || uiState === 'failed') && (
          <div className="fc-result-block">
            <div className={`fc-result-label ${uiState === 'success' ? 'ok' : 'bad'}`}>
              {resultMsg}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
