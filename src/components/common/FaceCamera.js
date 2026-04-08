// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import './FaceCamera.css';

// /**
//  * FaceCamera component
//  * Uses face-api.js for face detection + blink detection
//  * Props:
//  *   onCapture(base64, descriptor) - called when face verified + blink detected
//  *   mode: 'register' | 'verify'
//  *   storedDescriptor: Float32Array (for verify mode)
//  */
// export default function FaceCamera({ onCapture, onVerified, mode = 'register', storedDescriptor = null }) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);
//   const intervalRef = useRef(null);

//   const [status, setStatus] = useState('loading'); // loading, ready, detecting, verified, error
//   const [message, setMessage] = useState('Loading face detection models...');
//   const [blinkCount, setBlinkCount] = useState(0);
//   const [faceDetected, setFaceDetected] = useState(false);
//   const [eyesClosed, setEyesClosed] = useState(false);
//   const blinkCountRef = useRef(0);
//   const eyesClosedRef = useRef(false);
//   const modelsLoaded = useRef(false);

//   // Load face-api models from CDN
//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         const faceapi = await import('face-api.js');
//         const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
//         await Promise.all([
//           faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
//           faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
//           faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
//           faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
//         ]);
//         modelsLoaded.current = true;
//         await startCamera(faceapi);
//       } catch (err) {
//         console.error('Model load error:', err);
//         setStatus('error');
//         setMessage('Failed to load face detection. Please refresh and try again.');
//       }
//     };
//     loadModels();
//     return () => { stopCamera(); };
//   }, []);

//   const startCamera = async (faceapi) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: 640, height: 480 } });
//       streamRef.current = stream;
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         await videoRef.current.play();
//         setStatus('ready');
//         setMessage(mode === 'register' ? 'Position your face in the frame, then blink twice to register' : 'Look at the camera and blink to verify your identity');
//         startDetection(faceapi);
//       }
//     } catch (err) {
//       setStatus('error');
//       setMessage('Camera access denied. Please allow camera access and refresh.');
//     }
//   };

//   const stopCamera = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//     if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
//   };

//   // Eye Aspect Ratio for blink detection
//   const getEAR = (eye) => {
//     const A = Math.sqrt(Math.pow(eye[1].y - eye[5].y, 2) + Math.pow(eye[1].x - eye[5].x, 2));
//     const B = Math.sqrt(Math.pow(eye[2].y - eye[4].y, 2) + Math.pow(eye[2].x - eye[4].x, 2));
//     const C = Math.sqrt(Math.pow(eye[0].y - eye[3].y, 2) + Math.pow(eye[0].x - eye[3].x, 2));
//     return (A + B) / (2.0 * C);
//   };

//   const startDetection = (faceapi) => {
//     const EAR_THRESHOLD = 0.22;
//     const REQUIRED_BLINKS = 2;

//     intervalRef.current = setInterval(async () => {
//       if (!videoRef.current || !canvasRef.current) return;
//       try {
//         const detection = await faceapi
//           .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
//           .withFaceLandmarks()
//           .withFaceDescriptor();

//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         if (!detection) {
//           setFaceDetected(false);
//           setMessage('No face detected. Please center your face in the frame.');
//           return;
//         }

//         setFaceDetected(true);
//         const landmarks = detection.landmarks;
//         const leftEye = landmarks.getLeftEye();
//         const rightEye = landmarks.getRightEye();
//         const earLeft = getEAR(leftEye);
//         const earRight = getEAR(rightEye);
//         const ear = (earLeft + earRight) / 2;

//         // Draw face outline
//         const box = detection.detection.box;
//         ctx.strokeStyle = blinkCountRef.current >= REQUIRED_BLINKS ? '#2e7d32' : '#1a237e';
//         ctx.lineWidth = 3;
//         ctx.strokeRect(box.x, box.y, box.width, box.height);

//         // Blink detection
//         if (ear < EAR_THRESHOLD && !eyesClosedRef.current) {
//           eyesClosedRef.current = true;
//           setEyesClosed(true);
//         } else if (ear >= EAR_THRESHOLD && eyesClosedRef.current) {
//           eyesClosedRef.current = false;
//           setEyesClosed(false);
//           blinkCountRef.current += 1;
//           setBlinkCount(blinkCountRef.current);

//           if (blinkCountRef.current >= REQUIRED_BLINKS) {
//             clearInterval(intervalRef.current);
//             setStatus('verified');
//             setMessage('✅ Identity verified! Processing...');

//             // Capture frame
//             const captureCanvas = document.createElement('canvas');
//             captureCanvas.width = videoRef.current.videoWidth;
//             captureCanvas.height = videoRef.current.videoHeight;
//             captureCanvas.getContext('2d').drawImage(videoRef.current, 0, 0);
//             const base64 = captureCanvas.toDataURL('image/jpeg', 0.85);
//             const descriptor = Array.from(detection.descriptor);

//             stopCamera();

//             if (mode === 'register') {
//               onCapture && onCapture(base64, descriptor);
//             } else {
//               // Verify mode: compare with stored descriptor
//               if (storedDescriptor) {
//                 const dist = faceapi.euclideanDistance(descriptor, Array.from(storedDescriptor));
//                 if (dist < 0.5) {
//                   onVerified && onVerified(true, descriptor);
//                 } else {
//                   setStatus('error');
//                   setMessage('❌ Face does not match. Please try again.');
//                   setTimeout(() => { blinkCountRef.current = 0; setBlinkCount(0); startCamera(faceapi); }, 2000);
//                 }
//               } else {
//                 onVerified && onVerified(true, descriptor);
//               }
//             }
//           } else {
//             setMessage(`Blink detected! ${REQUIRED_BLINKS - blinkCountRef.current} more blink(s) needed.`);
//           }
//         }

//         if (blinkCountRef.current < REQUIRED_BLINKS) {
//           setMessage(`Face detected ✓ — Blink ${REQUIRED_BLINKS - blinkCountRef.current} more time(s) to ${mode === 'register' ? 'register' : 'verify'}`);
//         }
//       } catch (e) { /* skip frame */ }
//     }, 150);
//   };

//   return (
//     <div className="face-camera">
//       <div className="camera-wrapper">
//         <video ref={videoRef} className="camera-video" playsInline muted />
//         <canvas ref={canvasRef} className="camera-canvas" width={640} height={480} />
//         <div className={`camera-overlay ${status}`}>
//           {status === 'loading' && <div className="spinner" />}
//           {status === 'verified' && <div className="verified-icon">✅</div>}
//         </div>
//       </div>

//       <div className="camera-status">
//         <div className={`status-pill ${status}`}>{message}</div>
//         {status === 'ready' || status === 'detecting' ? (
//           <div className="blink-indicator">
//             <span className={`blink-dot ${blinkCount >= 1 ? 'done' : ''}`}>👁</span>
//             <span className={`blink-dot ${blinkCount >= 2 ? 'done' : ''}`}>👁</span>
//             <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{blinkCount}/2 blinks</span>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }



//new Second//

import React, { useRef, useEffect, useState } from 'react';
import './FaceCamera.css';

/**
 * FaceCamera — Big circular face scanner
 *
 * Visual design:
 *   - Large circular frame (not rectangle) surrounds the face area
 *   - Ring color:
 *       grey dashed  → loading / no face yet
 *       red solid    → no face detected / face mismatch
 *       yellow solid → face detected, waiting for blinks
 *       green solid  → verified ✓
 *   - Animated scanning line while detecting
 *   - Blink progress dots at bottom
 */
export default function FaceCamera({ onCapture, onVerified, mode = 'register', storedDescriptor = null }) {
  const videoRef    = useRef(null);
  const canvasRef   = useRef(null);
  const streamRef   = useRef(null);
  const intervalRef = useRef(null);
  const blinkCountRef  = useRef(0);
  const eyesClosedRef  = useRef(false);

  const [status,      setStatus]      = useState('loading');
  const [message,     setMessage]     = useState('Loading face detection...');
  const [blinkCount,  setBlinkCount]  = useState(0);
  const [ringColor,   setRingColor]   = useState('grey');   // grey | red | yellow | green
  const [scanLine,    setScanLine]    = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const faceapi = await import('face-api.js');
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        if (cancelled) return;
        await startCamera(faceapi);
      } catch {
        if (!cancelled) {
          setStatus('error');
          setRingColor('red');
          setMessage('Failed to load models. Please refresh and try again.');
        }
      }
    })();
    return () => { cancelled = true; stopCamera(); };
    // eslint-disable-next-line
  }, []);

  const startCamera = async (faceapi) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStatus('ready');
        setRingColor('grey');
        setScanLine(true);
        setMessage(
          mode === 'register'
            ? 'Center your face in the circle, then blink twice'
            : 'Look at the camera and blink twice to verify'
        );
        startDetection(faceapi);
      }
    } catch {
      setStatus('error');
      setRingColor('red');
      setMessage('Camera access denied. Please allow camera and refresh.');
    }
  };

  const stopCamera = () => {
    setScanLine(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
  };

  const getEAR = (eye) => {
    const A = Math.hypot(eye[1].x - eye[5].x, eye[1].y - eye[5].y);
    const B = Math.hypot(eye[2].x - eye[4].x, eye[2].y - eye[4].y);
    const C = Math.hypot(eye[0].x - eye[3].x, eye[0].y - eye[3].y);
    return (A + B) / (2.0 * C);
  };

  const startDetection = (faceapi) => {
    const EAR_THRESHOLD   = 0.22;
    const REQUIRED_BLINKS = 2;

    intervalRef.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;
      try {
        const detection = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        // Clear canvas every frame
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        if (!detection) {
          setRingColor('red');
          setMessage('No face detected. Please center your face in the circle.');
          return;
        }

        // Face detected — draw subtle landmark dots (optional, small)
        const lm = detection.landmarks;
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        [...lm.getLeftEye(), ...lm.getRightEye()].forEach(pt => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        const ear = (getEAR(lm.getLeftEye()) + getEAR(lm.getRightEye())) / 2;

        // Ring = yellow while face is detected + waiting for blinks
        if (blinkCountRef.current < REQUIRED_BLINKS) {
          setRingColor('yellow');
          setMessage(`Face detected ✓ — Blink ${REQUIRED_BLINKS - blinkCountRef.current} time(s) to ${mode === 'register' ? 'register' : 'verify'}`);
        }

        // Blink detection
        if (ear < EAR_THRESHOLD && !eyesClosedRef.current) {
          eyesClosedRef.current = true;
        } else if (ear >= EAR_THRESHOLD && eyesClosedRef.current) {
          eyesClosedRef.current = false;
          blinkCountRef.current += 1;
          setBlinkCount(blinkCountRef.current);

          if (blinkCountRef.current >= REQUIRED_BLINKS) {
            clearInterval(intervalRef.current);
            setScanLine(false);
            setStatus('verified');
            setRingColor('green');
            setMessage('✅ Verified! Processing...');

            // Capture frame
            const cap = document.createElement('canvas');
            cap.width  = videoRef.current.videoWidth;
            cap.height = videoRef.current.videoHeight;
            cap.getContext('2d').drawImage(videoRef.current, 0, 0);
            const base64    = cap.toDataURL('image/jpeg', 0.85);
            const descriptor = Array.from(detection.descriptor);

            stopCamera();

            if (mode === 'register') {
              onCapture && onCapture(base64, descriptor);
            } else {
              if (storedDescriptor && storedDescriptor.length > 0) {
                const dist = faceapi.euclideanDistance(descriptor, storedDescriptor);
                if (dist < 0.5) {
                  onVerified && onVerified(true, descriptor);
                } else {
                  setStatus('error');
                  setRingColor('red');
                  setMessage('❌ Face does not match. Try again.');
                  setTimeout(() => {
                    blinkCountRef.current = 0;
                    setBlinkCount(0);
                    startCamera(faceapi);
                  }, 2000);
                }
              } else {
                onVerified && onVerified(true, descriptor);
              }
            }
            return;
          }

          setMessage(`Blink ${blinkCountRef.current} ✓ — ${REQUIRED_BLINKS - blinkCountRef.current} more needed`);
        }
      } catch { /* skip frame */ }
    }, 150);
  };

  // Ring color → CSS class
  const ringClass = {
    grey:   'ring-grey',
    red:    'ring-red',
    yellow: 'ring-yellow',
    green:  'ring-green',
  }[ringColor] || 'ring-grey';

  return (
    <div className="fc-wrap">

      {/* ── Circular camera frame ── */}
      <div className={`fc-circle ${ringClass} ${status === 'verified' ? 'fc-verified' : ''}`}>

        {/* Video */}
        <video ref={videoRef} className="fc-video" playsInline muted />

        {/* Landmark canvas */}
        <canvas ref={canvasRef} className="fc-canvas" width={640} height={480} />

        {/* Scanning line animation */}
        {scanLine && status !== 'verified' && <div className="fc-scan-line" />}

        {/* Loading spinner */}
        {status === 'loading' && (
          <div className="fc-center-overlay">
            <div className="fc-spinner" />
            <span className="fc-loading-text">Loading AI models...</span>
          </div>
        )}

        {/* Verified big checkmark */}
        {status === 'verified' && (
          <div className="fc-center-overlay fc-check-overlay">
            <div className="fc-checkmark">✓</div>
          </div>
        )}

        {/* Corner brackets (scanner aesthetic) */}
        <div className="fc-corner fc-tl" />
        <div className="fc-corner fc-tr" />
        <div className="fc-corner fc-bl" />
        <div className="fc-corner fc-br" />
      </div>

      {/* ── Status message ── */}
      <div className={`fc-message fc-msg-${ringColor}`}>
        {message}
      </div>

      {/* ── Blink progress ── */}
      {(status === 'ready' || status === 'detecting') && (
        <div className="fc-blink-row">
          {[1, 2].map(i => (
            <div key={i} className={`fc-blink-dot ${blinkCount >= i ? 'fc-blink-done' : ''}`}>
              <span className="fc-eye-icon">{blinkCount >= i ? '😊' : '👁️'}</span>
              <span className="fc-blink-label">Blink {i}</span>
            </div>
          ))}
          <div className="fc-blink-count">{blinkCount} / 2</div>
        </div>
      )}

    </div>
  );
}
