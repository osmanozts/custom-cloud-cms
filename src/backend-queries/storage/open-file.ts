import supabase from "../../utils/supabase";

export async function openFile(path: string, filename: string, bucket: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(`${path}/${filename}`, 180);
  if (error) throw error;

  if (data?.signedUrl) {
    window.open(data.signedUrl, "_blank");
  }
}
