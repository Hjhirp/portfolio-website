import { useEffect, useState } from 'react';

export const useScript = (src: string): { loaded: boolean; error: boolean } => {
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector(`script[src="${src}"]`)) {
      setState({
        loaded: true,
        error: false
      });
      return;
    }

    // Create script
    const script = document.createElement('script');
    script.src = src;
    script.async = true;

    // Script event listeners
    const onScriptLoad = () => {
      setState({
        loaded: true,
        error: false
      });
    };

    const onScriptError = () => {
      script.remove();
      setState({
        loaded: true,
        error: true
      });
    };

    script.addEventListener('load', onScriptLoad);
    script.addEventListener('error', onScriptError);

    // Add script to document body
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      script.removeEventListener('load', onScriptLoad);
      script.removeEventListener('error', onScriptError);
    };
  }, [src]);

  return state;
};
