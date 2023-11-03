import '@testing-library/jest-dom'
import { fireEvent, prettyDOM, render } from '@testing-library/react'
import { Togglable } from './Togglable'

describe('<Togglable />', () => {
  let component
  const buttonLabel = 'show'

  beforeEach(() => {
    component = render(
      <Togglable buttonShowLabel={ buttonLabel }>
        <div className="testDiv">
          hola que ase
        </div>
      </Togglable>
    )
  })

  test('renders its children but not visible', () => {
    expect(component.container.querySelector('.testDiv')).not.toBeNull()
    const el = component.container.querySelector('.testDiv')
    expect(el.parentNode).toHaveStyle('display: none')
    // component.getByText('hola que ases')
  })

  test('after clicking its children must be shown', () => {
    const el = component.container.querySelector('.testDiv')
    const bt = component.getByText(buttonLabel)
    fireEvent.click(bt)
    expect(el.parentNode).not.toHaveStyle('display: none')
  })

  test('hides when click on close button', () => {
    const el = component.container.querySelector('.testDiv')
    const bt = component.getByText(buttonLabel)
    fireEvent.click(bt)
    expect(el.parentNode).not.toHaveStyle('display: none')

    const button = component.getByText('Cancel')
    // console.log(prettyDOM(button))

    fireEvent.click(button)

    expect(el.parentNode).toHaveStyle('display: none')
  })
})
