// import "@testing-library/react"
// import "@testing-library/jest-dom"
require('@testing-library/jest-dom')

// JSDOM 이 open 메소드 실행하지 않게 하기
window.open = jest.fn()
