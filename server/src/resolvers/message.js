import { v4 } from 'uuid';
import { writeDB } from '../dbController.js';
const setMsgs = data => writeDB('messages', data)

/*
parent: parent 객체. 거의 사용 안함.
args: Query에 필요한 필드에 제공되는 인수(parameter)
context: 로그인한 사용자 정보, db 엑세스 권한 - 중요한 정보들 
* */

const messageResolver = {
  Query: {
    messages: (parent, args, { db }) => {
      return db.messages
    },
    message: (parent, {id = ''}, { db }) => {
      return db.messages.find(m => m.id === id)
    }
  },
  Mutation: {
    createMessage: (parent, {text, userId}, { db }) => {
      const newMsg = {
        id: v4(),
        text: text,
        userId: userId,
        timestamp: Date.now(),
      }
      db.messages.unshift(newMsg)
      setMsgs(db.messages)
      return newMsg

    },
    updateMessage: (parent, {id, text, userId}, {db}) => {
      const targetIndex = db.messages.findIndex(msg => msg.id === id)
      if(targetIndex < 0) throw Error('메시지가 없습니다.')
      if(db.messages[targetIndex].userId !== userId) throw '사용자가 다릅니다.'
      const newMsg = {...db.messages[targetIndex], text: text}
      db.messages.splice(targetIndex, 1, newMsg)
      setMsgs(db.messages)
      return newMsg
    },
    deleteMessage: (parent, {id, userId, }, {db}) => {
      const targetIndex = db.messages.findIndex(msg => msg.id === id)
      if(targetIndex < 0) throw Error('메시지가 없습니다.')
      if (db.messages[targetIndex].userId !== userId) throw '사용자가 다릅니다.'

      db.messages.splice(targetIndex, 1)
      setMsgs(db.messages)
      return id
    },
  }
}

export default messageResolver;