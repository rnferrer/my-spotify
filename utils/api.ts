const createURL = (path: string) => window.location.origin + path


export const handleLogin = async () => {
  const res = await fetch(
    new Request(createURL('/api/login'), 
    {
      method: 'GET'
    })
  )

  if (res.ok){
    return res.json()
  }
}