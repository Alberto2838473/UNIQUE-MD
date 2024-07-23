import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

//Owner Numbers 
global.owner = [
  ['923135673658', 'wasi', false],
  [''], 
  [''],
]

//global.pairingNumber = "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUo4YUdyTDZ0dUxkMG5QempQL3FFOW44RVZ4dWsrVHRCQjRNa1diT2VYRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1FaNWVFK0RhN2xFK3pUMEVabkFMOG5xcG9yMmUzT2lGVzVmU2k0Nk0wbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTUZMUmR4dU05aE1PUDc4RXFFSXZPUTNBdXpMUEZMODBuaVQzOWk5ekY0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0c0VaZ3hkV2dPOFk5S2J0TEVjd3JwT0k0MXRQenJBQVZqWXFadkNGY2pZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRJWWZTcTMxQmFiQklXSWlQcGZrSzBaMEJRRHIyWmkrYWdkdkcyZ2FOMXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFRZjk4VTIxWVRGNEhxQmZqRVdKdG55VzFFNXpNaVpITnh1aEhHS0FOaXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk9jTjc4dDZaK2oyN3dWRzdJYVVGVGNDMUU5V1diNXJwc3Q0WUhTdmtGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmYwMi9YTG4yL3A3SDVINHduY1RBby9meS93ZnY1Mlp3am5mMzV4UnBFST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJvQnB2SFRsMnVGYmNCWGFPSlNjanc0cFQ5WmNrY3hBOFczYmhsd1l5MnEvUVREYnI5L2RYWWZNem50N3F5NXg3RFZndnd4OVN3VFRPN1c3SEVER2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6IkVCRit0OGN6L25lWmVoV3pGZExhc2xSYlRnNXVtT1ZmREdWWGI2ZTM3TWs9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlJ2bnR1ZTFIUVVLTFc0NGo0XzdnYWciLCJwaG9uZUlkIjoiZTcyYWNlZDItZTZiNi00NmZiLWJjODUtY2U2MmU5MmFiMzMwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZ5eXVqLzFFRmhOenRGaTFPQms3UnFkUmRIcz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFdGdna1dHVERDQ293alU3ZC9LUmNKL1FXWmM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVFRYWTkxRUEiLCJtZSI6eyJpZCI6IjQwNzIwODA5NjY1OjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQWxiZXJ0byJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSUR5dTljRUVJT24vclFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiaW5iUExyN3VPUHNWSFJIRVg1b2tyVVpRejJvOFNMUW9rR1NzTmUvOEhHYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoieTBOT1JSWnpXL0ZvUks0R1NpQmZMT0Z1S05zY3luL3NQUWJVRVRpNjUwUzg5Q3FjTTdnZi9BVy9ubkVyK3JSOXpzNmdodHhaRWh4OWpURkVxckxRQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6Imp0R2xDRnd6QmxHbXdjcTBEd1EzWlVUdEczZGcwTUlDMU0rT1A1TlhqbjZkU3RrTjBpaHV6UjlUTGdJOUNJWllYam1sQ2VqaDgwK1RhUStoUjdLdWpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3MjA4MDk2NjU6NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZcDJ6eTYrN2pqN0ZSMFJ4RithSksxR1VNOXFQRWkwS0pCa3JEWHYvQnhuIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNzM0MDMxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9BSSJ9" //put your bot number here
global.mods = ['923192173398'] 
global.prems = ['923192173398', '923192173398', '923192173398']
global.allowed = ['923192173398']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']

global.APIs = { // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz', 
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a', 
  'https://api.fgmods.xyz': 'dEBWvxCY'
}

// Sticker WM
global.botname = '𝗪𝗔𝗦𝗜-𝗠𝗗'
global.princebot = '🛡️𝗪𝗔𝗦𝗜 𝗧𝗘𝗖𝗛🛡️'
global.packname = '𝗪𝗔𝗦𝗜♥️' 
global.author = '𝗧𝗘𝗖𝗛♥️' 
global.princeig = 'https://www.instagram.com' 
global.princegp = 'https://whatsapp.com/channel/0029VaDK8ZUDjiOhwFS1cP2j'
global.menuvid = 'https://i.imgur.com/0UK6D3b.mp4'
global.Princesc = '' 
global.princeyt = 'https://youtube.com/@wasitech1'
global.Princelog = 'https://i.imgur.com/ujxeU8g.jpeg'
global.thumb = fs.readFileSync('./Assets/wasi.png')

global.wait = '*♻️ _ʟᴏᴅɪɴɢ ᴘʟᴢ ᴡᴀɪᴛ ᴅᴇᴀʀ _*\n*▰▰▰▱▱▱▱▱*'
global.imgs = '*🖼️ _𝙶𝙴𝚃𝚃𝙸𝙽𝙶 𝚈𝙾𝚄𝚁 ɪᴍᴀɢᴇs 𝚆𝙰𝙸𝚃..._*\n*▰▰▰▱▱▱▱▱*'
global.rwait = '♻️'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🌀' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
