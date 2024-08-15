"use client"
import { useParams } from "next/navigation";
const Post = () => {
    // folder structure /posts/[pid]
    const params = useParams();
    // example URL /posts/123
    const { slug } = params;
    // pid will equal 123
    return <p>Post: {slug}</p>
}

export default Post
