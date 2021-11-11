import MsgList from "../components/MsgList";
import queryClient from "../queryClient";

const Home = ({ smsgs, users }) => (
  <>
    <h1>SIMPLE HOME</h1>
    <MsgList smsgs={smsgs} users={users} />
  </>
)

export const getServerSideProps = async () => {
  const smsgs = await queryClient('get', '/messages')
  const users = await queryClient('get', '/users')
  return {
    props: { smsgs, users },
  }
}

export default Home;