import '@testing-library/jest-dom'
import { fireEvent, render }from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const component = render(<Note note={note} />)
  // console.log(component)
  // Tests para comprobar que se renderiza el contenido de texto esperado
  component.getByText('This is a test')
  component.getByText('make NOT important')
  // component.debug() // --> muestra lo que se está renderizando

  // console.log(prettyDOM(component.container.querySelector('button'))) // --> prettyDOM para mostrar un elemento concreto en bonito...

  // expect(component.container).toHaveTextContent(note.content)
})

const mockHandler = jest.fn()

test('click en bt make important', () => {
  const note = {
    content: 'This is a test',
    important: true
  }

  const component = render(<Note note={note} toggleImportance={mockHandler} />)
  const button = component.getByText('make NOT important')

  fireEvent.click(button)

  expect(mockHandler).toHaveBeenCalledTimes(1)
})
