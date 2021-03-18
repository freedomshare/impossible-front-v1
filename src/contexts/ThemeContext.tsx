import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from 'uikit'

const CACHE_KEY = 'IS_DARK'

const ThemeContext = React.createContext({ isDark: true, toggleTheme: () => null })

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  })

  const toggleTheme = () => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
