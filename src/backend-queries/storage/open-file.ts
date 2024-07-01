import supabase from "../../utils/supabase";

export async function openFile(path: string, filename: string, bucket: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(`${path}/${filename}`, 180);
  if (error) throw error;

  if (data?.signedUrl) {
    const link = document.createElement("a");
    link.href = data.signedUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
