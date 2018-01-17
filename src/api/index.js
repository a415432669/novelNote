import Dexie from 'dexie'
const db = new Dexie('BookNotes')
db.version(1).stores({
  books: '++id, title, date',
  category: '++id, title, type, bookId',
  notes: '++id, content, catId, bookId'
})

export default db
