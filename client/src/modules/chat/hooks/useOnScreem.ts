import { RefObject, useEffect, useState } from 'react';

const useOnScreen = (ref: RefObject<unknown>, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current as Element);
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.unobserve(ref.current as Element);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};

export default useOnScreen;
