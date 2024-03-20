import * as z from "zod";

export const UserValidation = z.object({
	profile_photo: z.string().min(1).url(),
	name: z
		.string()
		.min(3, { message: "Atleast 3 characters..." })
		.max(40, { message: "AtMax 40 characters" }),
	username: z
		.string()
		.min(3, { message: "Atleast 3 chars" })
		.max(40, { message: "Atmax 40 chars" }),
	bio: z
		.string()
		.min(3, { message: "Minimum 3 characters." })
		.max(1000, { message: "Maximum 1000 caracters." }),
});
