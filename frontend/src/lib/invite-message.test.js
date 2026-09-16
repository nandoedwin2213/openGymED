import { describe, expect, test } from 'vitest'
import { inviteMessage, whatsappShareUrl } from './invite-message.js'

const URL = 'https://gym.example.com'

describe('invite welcome message', () => {
  test('includes the code, the app URL and the four steps', () => {
    const m = inviteMessage('ABCD1234', URL)
    expect(m).toContain('*ABCD1234*')
    expect(m).toContain(URL)
    for (const step of ['1️⃣', '2️⃣', '3️⃣', '4️⃣']) expect(m).toContain(step)
  })

  test('share URL is a wa.me link with the encoded message', () => {
    const u = whatsappShareUrl('ABCD1234', URL)
    expect(u.startsWith('https://wa.me/?text=')).toBe(true)
    expect(decodeURIComponent(u.slice('https://wa.me/?text='.length))).toBe(inviteMessage('ABCD1234', URL))
  })
})
