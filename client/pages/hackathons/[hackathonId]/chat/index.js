import { useRouter, withRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const s = withRouter();
  console.log(s);
  //   console.log(router);
  return <div>Chat page</div>;
}
