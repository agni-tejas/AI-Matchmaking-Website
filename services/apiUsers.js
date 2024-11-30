import supabase from "./supabase";

// Fetch all users
export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return data;
}

// Create a new user
export async function createUser(newUser) {
  const imageName = `${Math.random()}-${newUser.avatar.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${"https://umlojvgynrtjpxjxoeno.supabase.co"}/storage/v1/object/public/profile/${imageName}`;
  let user = { ...newUser, avatar: imagePath };
  const { data, error } = await supabase.from("users").insert([user]);

  const { error: storageError } = await supabase.storage
    .from("profile")
    .upload(imageName, newUser.avatar);

  if (storageError) {
    console.error(storageError);
    throw new Error(
      "Cabin could not be uploaded and the cabin was not created"
    );
  }
  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data[0]; // Returning the created user
}
