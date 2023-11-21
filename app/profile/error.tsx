'use client'

const error = ({ error }: { error: Error}) => {
  return (
    <p>
      {error.message}
    </p>     
  )
};

export default error;