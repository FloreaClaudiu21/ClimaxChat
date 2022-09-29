import { Stack } from "@mui/system";
import { motion } from "framer-motion";
import logo from "../../assets/logo.gif";
import React, { memo } from "react";
import welcome from "../../assets/login_welcome.jpg";
import login_bg_video from "../../assets/login_video_bg.mp4";
import { Facebook, Google } from "@mui/icons-material";
import login_bg_img from "../../assets/login_bg.gif";
import { AppBar, Box, Button, Divider, Typography } from "@mui/material";
import { SignInWithGoogle, SignInWithFacebook } from "../../helpers/SignInUser";

const Login = ({ openInfo }) => {
	const { signFB } = SignInWithFacebook(openInfo);
	const { signGoogle } = SignInWithGoogle(openInfo);
	//////////////////////////////////////////////////
	return (
		<Stack className="w-full min-h-screen h-full bg-black relative gap-4 justify-center place-items-center overflow-hidden pb-2">
			<Box className="invisible absolute h-full w-full top-0 z-0 sm:visible">
				<video
					loop
					muted
					autoPlay
					src={login_bg_video}
					className=" w-full h-full object-cover"
				/>
			</Box>
			<Box className="visible absolute h-full w-full top-0 z-0 sm:invisible">
				<img
					src={login_bg_img}
					alt="Not found"
					className="visible w-full h-full object-cover sm:invisible"
				/>
			</Box>
			<Box className="invisible absolute top-0 w-full h-full bg-[rgba(0,0,0,0.65)] z-0 sm:visible" />
			<AppBar
				position="absolute"
				className="h-auto bg-transparent sm:bg-[rgba(0,0,0,0.4)] shadow-md p-2 z-30"
			>
				<Stack
					direction={"row"}
					gap={"20px"}
					className="place-items-end group"
				>
					<motion.img
						src={logo}
						initial={{ opacity: 0, x: "-30px" }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ ease: "easeOut", duration: 0.6 }}
						whileHover={{
							scale: 1.06,
						}}
						alt="Not found"
						className="w-10 h-10 object-fill rounded-md border-[2px] border-blue-700 dark:bg-black"
					/>
					<Typography
						variant="h6"
						component={"h2"}
						className="group-hover:underline delay-100 transition-all text-blue-700"
					>
						<motion.span
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ ease: "easeOut", duration: 1.2 }}
						>
							ClimaxChat
						</motion.span>
					</Typography>
				</Stack>
			</AppBar>
			<Stack className="w-[350px] sm:w-[450px] h-[550px] sm:h-[600px] mt-[100px] flex-shrink bg-slate-100 p-1 rounded-lg shadow-lg z-10 border-4 border-[rgba(0,0,0,0.4)]">
				<Stack className="flex-1 bg-slate-100 overflow-hidden">
					<motion.img
						src={welcome}
						initial={{ opacity: 0, y: "-60px" }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ ease: "easeOut", duration: 0.6 }}
						alt="Not found"
						className="w-full min-h-[350px] sm:min-h-[400px]"
					/>
					<Stack className="h-full justify-end">
						<Typography
							variant="h6"
							component={"span"}
							textAlign={"center"}
							className="text-base sm:text-lg pt-2 relative bottom-0"
						>
							<motion.span
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ ease: "easeOut", duration: 1.8 }}
							>
								Sign In Page
							</motion.span>
						</Typography>
						<Divider className="w-[70%] sm:w-[40%] mx-auto bg-slate-800" />
					</Stack>
				</Stack>
				<motion.div
					initial={{ opacity: 0, x: "-80px" }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="flex justify-end flex-col max-w-[400px] mx-auto h-[120px] p-2 gap-2"
				>
					<Button
						variant="contained"
						onClick={signGoogle}
						className="text-[14px] sm:text-xs bg-red-600 hover:bg-red-800 hover:underline hover:scale-105 gap-1 p-1 px-2 justify-start transition-all delay-75 ease-in-out"
						startIcon={<Google />}
					>
						Sign in with Google
					</Button>
					<Button
						variant="contained"
						onClick={signFB}
						className="text-[14px] sm:text-xs bg-blue-600 hover:bg-blue-800 hover:scale-105 hover:underline gap-1 p-1 px-2 justify-start transition-all ease-in-out"
						startIcon={<Facebook />}
					>
						Sign in with Facebook
					</Button>
				</motion.div>
			</Stack>
		</Stack>
	);
};

export default memo(Login);
