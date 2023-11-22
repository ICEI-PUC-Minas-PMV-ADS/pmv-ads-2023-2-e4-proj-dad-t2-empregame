import { useAuth } from '../context/auth'
import { IMensagem } from '../interface/IMensagem'
import { IVagaCandidato } from '../interface/IVaga'
import { useFetch } from '../utils/hooks/useFetch'
import { useState } from 'react'
import { useMutation } from '../utils/hooks/useMutation'
import Toast from 'react-native-toast-message'
import {
  Box,
  Button,
  HStack,
  Input,
  Link,
  ScrollView,
  Text,
  VStack
} from 'native-base'

export const Chat = (props: { match?: IVagaCandidato }) => {
  const { user } = useAuth()

  const [newMensagem, setNewMensagem] = useState<string>('')

  const { data: mensagens, refetch } = useFetch<IMensagem[]>(
    '/mensagens/' + props.match?.id
    // { interval: 1000, enable: isOpen }
  )

  const { mutate: mutateNovaMensagem, isFetching: isFetchingNovaMensagem } =
    useMutation<IMensagem>('/mensagens', {
      method: 'POST',
      onSuccess: () => {
        refetch()
        setNewMensagem('')
      },
      onError: (err) => {
        Toast.show({ text1: err.message, type: 'error' })
      }
    })

  return (
    <ScrollView flex={1} paddingX={'15px'} paddingTop={'20px'}>
      <Box>
        <Text color={'#5A2DA4'} fontWeight={'bold'} fontSize={'20px'}>
          {props.match?.vaga?.nome}
        </Text>
        <Text color={'#606060'} fontWeight={'regular'} fontSize={'16px'}>
          Conversando com{' '}
          {user?.id === props.match?.id_usuario ? (
            <Link href={'/perfil?id=' + props.match?.vaga?.usuario.id}>
              {props.match?.vaga?.usuario.nome}
            </Link>
          ) : (
            <Link href={'/perfil?id=' + props.match?.usuario?.id}>
              {props.match?.usuario?.nome}
            </Link>
          )}
        </Text>
      </Box>

      <VStack direction={'column'} space={'30px'}>
        <VStack
          direction={'column'}
          space={'10px'}
          overflow={'auto'}
          maxH={'600px'}
        >
          {mensagens?.map((msg) => (
            <Box
              key={msg.id}
              maxW={'80%'}
              alignSelf={
                msg.id_usuario === user?.id ? 'flex-end' : 'flex-start'
              }
              bg={msg.id_usuario === user?.id ? '#6D3BBF' : '#F1E9FF'}
              px={'15px'}
              py={'10px'}
              color={msg.id_usuario === user?.id ? 'white' : '#2E2E2E'}
              fontSize={'14px'}
              fontWeight={'medium'}
              rounded={
                msg.id_usuario === user?.id
                  ? '11px 11px 0px 11px'
                  : '11px 11px 11px 0px'
              }
              textAlign={msg.id_usuario === user?.id ? 'right' : 'left'}
            >
              {msg.conteudo}
            </Box>
          ))}
        </VStack>

        <HStack space={'10px'} w={'full'}>
          <Input
            rounded={'full'}
            borderWidth={'1px'}
            borderColor={'#2E2E2E'}
            placeholder={'Digite aqui'}
            onChangeText={(e) => setNewMensagem(e)}
            flex={1}
          ></Input>
          <Button
            rounded={'full'}
            bg={'#5A2DA4'}
            py={'10px'}
            px={'25px'}
            color={'white'}
            fontSize={'16px'}
            fontWeight={'regular'}
            onPress={() => {
              mutateNovaMensagem({
                conteudo: newMensagem,
                id_usuario: user?.id,
                id_vaga_candidato: props.match?.id
              })
            }}
          >
            Enviar
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  )
}

const IconChat = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      style={{ minWidth: '19px' }}
      fill="none"
    >
      <g clipPath="url(#clip0_34_538)">
        <path
          d="M15.2564 2.56845C14.3062 1.7777 13.2024 1.19233 12.0148 0.849229C10.8271 0.506132 9.58123 0.412746 8.35568 0.574955C6.08848 0.869493 4.01834 2.01583 2.56562 3.78121C1.1129 5.54659 0.386482 7.79867 0.533872 10.0802C0.681263 12.3617 1.69141 14.5016 3.35921 16.0653C5.027 17.6291 7.22742 18.4996 9.51368 18.5H14.7502C15.7444 18.4988 16.6975 18.1033 17.4005 17.4003C18.1035 16.6973 18.499 15.7442 18.5002 14.75V8.98171V8.93446C18.4208 7.70854 18.0922 6.51169 17.5345 5.41712C16.9767 4.32254 16.2016 3.35322 15.2564 2.56845ZM6.50018 5.74996H9.50018C9.69909 5.74996 9.88986 5.82897 10.0305 5.96962C10.1712 6.11028 10.2502 6.30104 10.2502 6.49996C10.2502 6.69887 10.1712 6.88963 10.0305 7.03029C9.88986 7.17094 9.69909 7.24996 9.50018 7.24996H6.50018C6.30127 7.24996 6.1105 7.17094 5.96985 7.03029C5.8292 6.88963 5.75018 6.69887 5.75018 6.49996C5.75018 6.30104 5.8292 6.11028 5.96985 5.96962C6.1105 5.82897 6.30127 5.74996 6.50018 5.74996ZM12.5002 13.25H6.50018C6.30127 13.25 6.1105 13.1709 5.96985 13.0303C5.8292 12.8896 5.75018 12.6989 5.75018 12.5C5.75018 12.301 5.8292 12.1103 5.96985 11.9696C6.1105 11.829 6.30127 11.75 6.50018 11.75H12.5002C12.6991 11.75 12.8899 11.829 13.0305 11.9696C13.1712 12.1103 13.2502 12.301 13.2502 12.5C13.2502 12.6989 13.1712 12.8896 13.0305 13.0303C12.8899 13.1709 12.6991 13.25 12.5002 13.25ZM12.5002 10.25H6.50018C6.30127 10.25 6.1105 10.1709 5.96985 10.0303C5.8292 9.88963 5.75018 9.69887 5.75018 9.49996C5.75018 9.30104 5.8292 9.11028 5.96985 8.96963C6.1105 8.82897 6.30127 8.74996 6.50018 8.74996H12.5002C12.6991 8.74996 12.8899 8.82897 13.0305 8.96963C13.1712 9.11028 13.2502 9.30104 13.2502 9.49996C13.2502 9.69887 13.1712 9.88963 13.0305 10.0303C12.8899 10.1709 12.6991 10.25 12.5002 10.25Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_34_538">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
