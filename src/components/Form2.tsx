// import React from 'react';
// // import axios from 'axios';
// // import type { NextPage } from 'next';
// import { useForm, SubmitHandler } from 'react-hook-form';
// // import { useRouter } from 'next/router'

// import { useAuth } from '../contexts';
// import { useEffect, useState } from 'react';

// type Inputs = {
//   username: string;
//   password: string;
// };

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const { username, setUsername } = useAuth();
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<Inputs>();

//   useEffect(() => {
//     if (username !== '') {
//       router.push('/');
//     }
//   }, [router, username]);

//   const onSubmit: SubmitHandler<Inputs> = async (data) => {
//     try {
//       await axios.post('/api/auth', data);

//       setUsername(data.username);

//       router.push('/');
//     } catch (error) {
//       setError('username', {
//         type: 'manual',
//         // @ts-expect-error not going to type error
//         message: error.response.data.error,
//       });
//     }
//   };

//   return (
//     <main>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <label>
//           username
//           <input
//             placeholder="Enter your username..."
//             {...register('username', { required: true })}
//           />
//           {errors.username && (
//             <span>
//               {errors.username.type === 'required'
//                 ? 'A usernmae is required'
//                 : errors.username.message}
//             </span>
//           )}
//         </label>

//         <label>
//           password
//           <div>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Enter your password..."
//               {...register('password', { required: true })}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? 'Hide' : 'Show'}
//             </button>
//             {errors.password && <span>A password is required</span>}
//           </div>
//         </label>
//       </form>
//     </main>
//   );
// };

export {};
