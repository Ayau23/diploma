import ChatHeader from '@/components/Chat/Header'
import { Wrapper } from '@/components/Layout/Wrapper'
import { Container } from '@/components/UI/Container'
import { Layout } from '@/modules/Layout'
import Head from 'next/head'
import { ReactElement } from 'react'
import useWebSocket from 'react-use-websocket'

const Main = () => {
  const WS_URL = 'ws://drongo.pythonanywhere.com/ws/chat/1/'

  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.')
    },
  })

  return (
    <>
      <Head>
        <title>GoIntern | Chat</title>
      </Head>
      <Wrapper>
        <Container className='pt-10 pb-24 mx-auto xs:pt-0'>
          <ChatHeader chatName={''} />
          <div className='w-full flex flex-row'>
            {/* <ChatSidebar /> */}
            {/* <ChatContent /> */}
          </div>
        </Container>
      </Wrapper>
    </>
  )
}

Main.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Main
