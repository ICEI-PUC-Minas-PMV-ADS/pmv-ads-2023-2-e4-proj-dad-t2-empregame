import { Button, ScrollView, View } from 'native-base'
import { Text } from 'react-native-svg'
import { useAuth } from '../context/auth'
import { useFetch } from '../utils/hooks/useFetch'
import { IVaga } from '../interface/IVaga'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import CardVaga from '../components/card-vaga'

export const Feed = () => {
  const { deslogarSubmit } = useAuth()
  const [pesquisa, setPesquisa] = useState<string | null>(null)
  const [hardskill, setHardskill] = useState<string | null>(null)
  const [softskill, setSoftskill] = useState<string | null>(null)
  const { data: vagas, refetch } = useFetch<IVaga[]>('/vagas', {
    params: { pesquisa, hardskill, softskill, situacao: 'ATIVO' },
    itensRefresh: [pesquisa, hardskill, softskill],
    onError: (err) => {
      if (err.response?.data)
        Toast.show({ text1: err.response.data.message, type: 'error' })
    }
  })

  return (
    <ScrollView flex={1} paddingX={'15px'} paddingTop={'20px'}>
      {vagas?.map((vaga) => (
        <CardVaga
          key={vaga.id + vaga.nome}
          vaga={vaga}
          refetch={() => refetch}
        />
      ))}
      <Button onPress={() => deslogarSubmit()}>Deslogar</Button>
    </ScrollView>
  )
}
