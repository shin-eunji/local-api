import MsgList from "../components/MsgList";
import { fetcher } from "../queryClient";
import {GET_MESSAGES} from "../graphql/messages";

const Home = ({ smsgs }) => (
  <>
    <h1>SIMPLE HOME</h1>
    <MsgList smsgs={smsgs} />
  </>
)

export const getServerSideProps = async () => {
  const { messages: smsgs } = await fetcher(GET_MESSAGES)

  return {
    props: { smsgs },
  }
}

export default Home;