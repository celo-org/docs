import React from 'react';

type Props = {
  name: string;
};

const LiveCodeNotFound: React.FC<Props> = (props) => {
  const { name } = props;

  return (
    <div>
      <div>Couldn't find '{name}'</div>
    </div>
  );
};

export default LiveCodeNotFound;
