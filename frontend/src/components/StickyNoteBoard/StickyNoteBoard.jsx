import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Plus, X, GripVertical } from 'lucide-react'

export function StickyNoteBoard({ initialNotes = [], onNoteChange, className = '' }) {
  const [notes, setNotes] = useState(initialNotes)

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      encounter_id: notes[0]?.encounter_id,
      text: ''
    }
    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
    onNoteChange?.(updatedNotes)
  }

  const updateNote = (id, text) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, text } : note
    )
    setNotes(updatedNotes)
    onNoteChange?.(updatedNotes)
  }

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    setNotes(updatedNotes)
    onNoteChange?.(updatedNotes)
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const reorderedNotes = Array.from(notes)
    const [reorderedItem] = reorderedNotes.splice(result.source.index, 1)
    reorderedNotes.splice(result.destination.index, 0, reorderedItem)

    setNotes(reorderedNotes)
    onNoteChange?.(reorderedNotes)
  }

  return (
    <div className={`p-4 bg-white rounded-lg shadow-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Encounter Notes</h2>
        <button
          onClick={addNote}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {notes.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`relative bg-yellow-100 rounded-lg shadow-sm transition-shadow ${
                        snapshot.isDragging ? 'shadow-md' : ''
                      }`}
                    >
                      <div className="flex items-start p-3">
                        <div
                          {...provided.dragHandleProps}
                          className="flex-shrink-0 mr-2 mt-1 cursor-move"
                        >
                          <GripVertical className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-grow">
                          <textarea
                            value={note.text}
                            onChange={(e) => updateNote(note.id, e.target.value)}
                            placeholder="Type your note here..."
                            className="w-full h-24 bg-transparent border-none resize-none focus:ring-0 text-sm"
                          />
                        </div>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="flex-shrink-0 ml-2 text-gray-500 hover:text-gray-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

