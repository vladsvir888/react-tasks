import { useState } from 'react';

const usePasswordStrength = () => {
  const [progressValue, setProgressValue] = useState(0);

  const checkPassword = (value: string) => {
    const updates = {
      0: () => setProgressValue(0),
      1: () => setProgressValue(25),
      2: () => setProgressValue(50),
      3: () => setProgressValue(75),
      4: () => setProgressValue(100),
    };
    let strength = 0;

    if (value.match(/[0-9]/)) strength += 1;
    if (value.match(/[A-Z]/)) strength += 1;
    if (value.match(/[a-z]/)) strength += 1;
    if (value.match(/[!@#$%^&*(),.?":{}|<>]/)) strength += 1;

    updates[strength as keyof typeof updates]();
  };

  return {
    checkPassword,
    progressValue,
  };
};

export default usePasswordStrength;
