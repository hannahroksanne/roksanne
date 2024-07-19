import React from "react"
import ReactDOM from "react-dom/client"
import { Flex, Text, Button } from "@radix-ui/themes"
import { Theme, ThemePanel } from "@radix-ui/themes"
import { create } from "zustand"
import "@radix-ui/themes/styles.css"
import "./index.css"

const useStore = create(() => {
  return {}
})

const useErrorStore = create(() => {
  return {}
})

function requestParamValueUpdate(paramId, value) {
  if (typeof globalThis.__postNativeMessage__ === "function") {
    globalThis.__postNativeMessage__("setParameterValue", {
      paramId,
      value,
    })
  }
}

if (process.env.NODE_ENV !== "production") {
  import.meta.hot.on("reload-dsp", () => {
    console.log("Sending reload dsp message")

    if (typeof globalThis.__postNativeMessage__ === "function") {
      globalThis.__postNativeMessage__("reload")
    }
  })
}

globalThis.__receiveStateChange__ = function (state) {
  useStore.setState(JSON.parse(state))
}

globalThis.__receiveError__ = (err) => {
  useErrorStore.setState({ error: err })
}

function App() {
  let state = useStore()
  let { error } = useErrorStore()

  return (
    <Theme>
      <Interface
        {...state}
        error={error}
        requestParamValueUpdate={requestParamValueUpdate}
        resetErrorState={() => useErrorStore.setState({ error: null })}
      />
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let's go</Button>
      </Flex>

      <ThemePanel />
    </Theme>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Request initial processor state
if (typeof globalThis.__postNativeMessage__ === "function") {
  globalThis.__postNativeMessage__("ready")
}
