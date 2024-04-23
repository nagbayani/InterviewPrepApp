"use client";

interface SignupButtonProps {
  pending: boolean;
}

export function SignupButton({ pending }: SignupButtonProps) {
  return (
    <button
      className='mb-3 inline-block w-[60%]'
      style={{
        background:
          "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
      }}
      aria-disabled={pending}
      type='submit'
    >
      {pending ? "Submitting..." : "Sign up"}
    </button>
  );
}
