"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { UserValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";


interface Props {
	user: {
		id: string;
		objectId: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
	const [imageFile, setimageFile] = useState<File[]>([]);
	

	const form = useForm({
		resolver: zodResolver(UserValidation),
		defaultValues: {
			profile_photo: user?.image || "",
			name: user?.name || "",
			username: user?.username || "",
			bio: user?.bio || "",
		},
	});
	function onSubmit(values: z.infer<typeof UserValidation>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		

		console.log(values);
	}

	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];

			setimageFile(Array.from(e.target.files));

			if (!file.type.includes("image")) return;

			fileReader.onload = async (event) => {
				const imageDataUrl = event.target?.result?.toString() || "";
				// console.log("\nimageData: ", event.target?.result);
				fieldChange(imageDataUrl);
			};

			fileReader.readAsDataURL(file);
		}
	};

	return (
		<Form {...form}>
			<form
				className="flex flex-col justify-start gap-5"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="profile_photo"
					render={({ field }) => (
						<FormItem className="flex items-center gap-3 space-y-1">
							<FormLabel className="account-form_image-label">
								{field.value ? (
									<Image
										src={field.value}
										alt="profile-picture"
										width={96}
										height={96}
										priority
										className="object-contain rounded-full"
									/>
								) : (
									<Image
										src="/assets/profile.svg"
										alt="profile-icon"
										width={24}
										height={24}
										className="object-contain"
									/>
								)}
							</FormLabel>
							<FormControl className="flex-1 text-base-semibold text-gray-200">
								<Input
									id="profile-picture"
									accept="image/*"
									placeholder="Add profile photo"
									className="account-form_image-input"
									type="file"
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3 space-y-1">
							<FormLabel className="text-base-semibold text-light-2">
								Name
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your name"
									className="account-form_input no-focus"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3 space-y-1">
							<FormLabel className="text-base-semibold text-light-2">
								UserName
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your username"
									className="account-form_input no-focus"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3 space-y-1">
							<FormLabel className="text-base-semibold text-light-2">
								Bio
							</FormLabel>
							<FormControl>
								<Textarea
									rows={3}
									placeholder="Write about your bio"
									className="account-form_input no-focus"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit" className="bg-primary-500 space-y-1">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default AccountProfile;
