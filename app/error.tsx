'use client'

const Error = ({ error }: { error: Error}) => {
  return (
    <p>
      {error.message}
    </p>     
  )
};

export default Error;