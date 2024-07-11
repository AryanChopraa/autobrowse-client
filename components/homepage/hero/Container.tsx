import React, { ReactNode } from 'react';


type ContainerProps = {
  children: ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-2">
      {children}
    </div>
  );
}

export default Container;
