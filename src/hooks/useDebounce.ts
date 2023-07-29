import { ref } from 'vue'

const useDebounce = (timeout = 1000) => {
  let timerRef: number | null = null
  const displayValue = ref('')
  const debouncedValue = ref('')

  const debounceListener = (e: InputEvent) => {
    if (timerRef !== null) {
      clearTimeout(timerRef)
    }

    const value = (e.target as HTMLInputElement).value

    if (e.target !== null) {
      displayValue.value = value
      timerRef = setTimeout(() => {
        debouncedValue.value = value
      }, timeout)
    }
  }

  return { debouncedValue, displayValue, debounceListener }
}

export default useDebounce
