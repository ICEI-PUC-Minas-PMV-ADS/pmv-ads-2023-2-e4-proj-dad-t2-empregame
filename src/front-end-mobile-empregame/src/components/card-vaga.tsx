import { useState } from 'react'
import { useAuth } from '../context/auth'
import { IVaga } from '../interface/IVaga'
import { useMutation } from '../utils/hooks/useMutation'
import { Box, Button, Divider, HStack, Link, Text, VStack } from 'native-base'
import dayjs from 'dayjs'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const CardVaga = (
  props: { vaga?: IVaga | null; refetch: () => void },
  { navigation }: any
) => {
  const { user } = useAuth()
  // const patch = ;
  const isMatch = props.vaga?.vaga_candidato?.find(
    (e) => e.id_usuario === user?.id
  )

  const [isLike, setIsLike] = useState<boolean>(isMatch ? true : false)

  const { mutate: mutateTirarLike } = useMutation<void>(
    '/vagas/match/' + isMatch?.id,
    {
      method: 'DELETE',
      onSuccess: () => {
        props.refetch()
      }
    }
  )

  const { mutate: mutateAddLike } = useMutation<{
    id_usuario?: number | null
    id_vaga?: number | null
  }>('/vagas/match', {
    method: 'POST',
    onSuccess: () => {
      props.refetch()
    }
  })

  const { mutate: mutateAtualizarSituacaoVaga } = useMutation<{
    situacao: IVaga['situacao']
  }>('/vagas/' + props.vaga?.id, {
    method: 'PATCH',
    onSuccess: () => {
      props.refetch()
    }
  })

  return (
    <VStack
      direction={'column'}
      py={'20px'}
      px={'25px'}
      space={'25px'}
      borderWidth={'1px'}
      borderColor={'#E1E1E1'}
      rounded={'13px'}
      bg={'white'}
      width={'100%'}
    >
      <VStack justifyContent={'space-between'}>
        <HStack
          display={'flex'}
          flexDirection={'row'}
          space={'15px'}
          alignItems={'center'}
        >
          <IconMaleta />
          <Text
            fontFamily={'Outfit-500'}
            fontSize={'20px'}
            fontWeight={'bold'}
            color={'#2E2E2E'}
          >
            {props.vaga?.nome}
          </Text>
        </HStack>
      </VStack>
      <HStack space={'8px'} flexDirection={'row'}>
        {props.vaga?.vaga_hardskill?.map((hardskill) => (
          <Box
            key={hardskill.id}
            bg={'#5A2DA4'}
            py={'5px'}
            px={'10px'}
            rounded={'full'}
          >
            <Text
              fontSize={'14px'}
              color={'white'}
              fontWeight={'medium'}
              textAlign={'center'}
            >
              {hardskill?.hardskill?.nome}
            </Text>
          </Box>
        ))}
        {props.vaga?.vaga_softskill?.map((softskill) => (
          <Box
            key={softskill.id}
            bg={'#5A2DA4'}
            py={'5px'}
            px={'10px'}
            rounded={'full'}
          >
            <Text
              fontSize={'14px'}
              color={'white'}
              fontWeight={'medium'}
              textAlign={'center'}
            >
              {softskill?.softskill?.nome}
            </Text>
          </Box>
        ))}
      </HStack>
      <VStack space={'15px'}>
        <VStack space={'15px'} direction={'column'}>
          <VStack space={'5px'} direction={'column'}>
            <Text
              fontFamily={'Outfit-500'}
              fontSize={'14px'}
              color={'#2E2E2E'}
              fontWeight={'semibold'}
            >
              Descrição
            </Text>
            <Text
              fontFamily={'Outfit-500'}
              fontSize={'14px'}
              color={'#2E2E2E'}
              fontWeight={'normal'}
            >
              {props.vaga?.descricao}
            </Text>
          </VStack>
          <VStack space={'5px'} direction={'column'}>
            <Text
              fontFamily={'Outfit-500'}
              fontSize={'14px'}
              color={'#2E2E2E'}
              fontWeight={'semibold'}
            >
              Benefícios
            </Text>
            <Text
              fontFamily={'Outfit-500'}
              fontSize={'14px'}
              color={'#2E2E2E'}
              fontWeight={'normal'}
            >
              {props.vaga?.beneficios}
            </Text>
          </VStack>
          <HStack space={'7px'} flexDirection={'row'} alignItems={'center'}>
            <IconPerson />
            <Text
              fontFamily={'Outfit-500'}
              fontSize={'14px'}
              color={'#2E2E2E'}
              fontWeight={'normal'}
            >
              {props.vaga?.vaga_candidato?.length} pessoas interessadas
            </Text>
          </HStack>
        </VStack>
        <Divider orientation={'horizontal'} h={'1px'} bg={'#E1E1E1'} />
        <HStack space={'50px'}>
          <VStack space={'10px'} direction={'column'}>
            <VStack space={'2px'} direction={'column'}>
              <Text
                fontFamily={'Outfit-500'}
                fontSize={'14px'}
                color={'#2E2E2E'}
                fontWeight={'semibold'}
              >
                Empresa
              </Text>
              <Text
                fontFamily={'Outfit-500'}
                fontSize={'14px'}
                color={'#2E2E2E'}
                fontWeight={'normal'}
              >
                {props.vaga?.empresa_nome}
              </Text>
            </VStack>
            <VStack space={'2px'} direction={'column'}>
              <Text
                fontFamily={'Outfit-500'}
                fontSize={'14px'}
                color={'#2E2E2E'}
                fontWeight={'semibold'}
              >
                Salário
              </Text>
              <Text
                fontFamily={'Outfit-500'}
                fontSize={'14px'}
                color={'#2E2E2E'}
                fontWeight={'normal'}
              >
                {props.vaga?.salario}
              </Text>
            </VStack>
          </VStack>

          <VStack space={'10px'} direction={'column'}>
            <VStack space={'2px'} direction={'column'}>
              <Text
                fontFamily={'Outfit-500'}
                fontSize={'14px'}
                color={'#2E2E2E'}
                fontWeight={'semibold'}
              >
                Estado
              </Text>
              <Text
                fontFamily={'Outfit-500'}
                fontSize={'14px'}
                color={'#2E2E2E'}
                fontWeight={'normal'}
              >
                {props.vaga?.empresa_estado}
              </Text>
            </VStack>
            <VStack space={'2px'} direction={'column'}>
              <Text
                fontFamily={'Outfit-500'}
                fontSize={'14px'}
                color={'#2E2E2E'}
                fontWeight={'semibold'}
              >
                Cidade
              </Text>
              <Text
                fontFamily={'Outfit-500'}
                fontSize={'14px'}
                color={'#2E2E2E'}
                fontWeight={'normal'}
              >
                {props.vaga?.empresa_cidade}
              </Text>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
      {/* {user?.tipo === 'CANDIDATO' && ( */}
      <VStack space={'20px'}>
        <Button
          onPress={() => {
            if (isMatch && isMatch?.match !== true) {
              mutateTirarLike()
            } else {
              mutateAddLike({
                id_usuario: user?.id ? user.id : 1,
                id_vaga: props.vaga?.id
              })
            }
            isLike === true ? setIsLike(false) : setIsLike(true)
          }}
          bg={isLike === true ? '#6D3BBF' : 'white'}
          borderColor={'#6D3BBF'}
          borderWidth={'2px'}
          rounded={'full'}
          py={'10px'}
          px={'25px'}
          w={'full'}
        >
          <HStack space={'10px'} alignItems={'center'}>
            <IconCoracao
              fill={isLike === true ? '#FF5757' : 'white'}
              borderColor={'#6D3BBF'}
            />
            <Text
              fontFamily={'Outfit-500'}
              color={isLike === true ? 'white' : '#6D3BBF'}
              fontSize={'18px'}
              fontWeight={'semibold'}
              textAlign={'center'}
            >
              Me Interessei
            </Text>
          </HStack>
        </Button>
        {/* {isMatch?.match === true && <ModalChat match={isMatch} />} */}
        <HStack space={'8px'} w={'full'}>
          <HStack
            bg={'#289C65'}
            py={'10px'}
            px={'25px'}
            rounded={'full'}
            space={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            flex={1}
          >
            <IconMatch />
            <Text
              color={'white'}
              fontSize={'16px'}
              fontWeight={'semibold'}
              textAlign={'center'}
              fontFamily={'Outfit-500'}
            >
              Deu Match
            </Text>
          </HStack>

          <Button
            onPress={() => {
              navigation.navigate('Chat')
            }}
            bg={'white'}
            borderColor={'#6D3BBF'}
            borderWidth={'2px'}
            rounded={'full'}
            py={'10px'}
            px={'25px'}
            flex={1}
          >
            <HStack space={'10px'} alignItems={'center'}>
              <IconChat />
              <Text
                fontFamily={'Outfit-500'}
                color={'#6D3BBF'}
                fontSize={'18px'}
                fontWeight={'semibold'}
                textAlign={'center'}
              >
                Chat
              </Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
      {/*       // )} */}
      {user?.tipo === 'RECRUTADOR' /* && patch !== '/feed' */ && (
        <>
          {/* <ModalCandidatosInteressados
            idVaga={props.vaga?.id}
            qtdCandidatosInteressados={props.vaga?.vaga_candidato?.length}
          /> */}
          <Button
            onPress={() => {}}
            bg={'#6D3BBF'}
            borderColor={'#6D3BBF'}
            borderWidth={'2px'}
            rounded={'full'}
            py={'10px'}
            px={'25px'}
            w={'full'}
          >
            <HStack space={'10px'} alignItems={'center'}>
              <IconCoracao fill={'#FF5757'} borderColor={'#6D3BBF'} />
              <Text
                fontFamily={'Outfit-500'}
                color={'white'}
                textAlign={'center'}
                fontSize={'18px'}
                fontWeight={'semibold'}
              >
                {props.vaga?.vaga_candidato?.length} Candidatos Interessados
              </Text>
            </HStack>
          </Button>
          <VStack space={'25px'}>
            {/* <ModalEditarVaga
              vaga={props.vaga}
              refetch={() => {
                props.refetch()
              }}
            /> */}
            <HStack space={'8px'} w={'full'}>
              <Button
                onPress={() => {}}
                bg={'white'}
                borderColor={'#6D3BBF'}
                borderWidth={'2px'}
                rounded={'full'}
                py={'10px'}
                px={'25px'}
                flex={1}
              >
                <HStack space={'10px'} alignItems={'center'}>
                  <IconEdit />
                  <Text
                    fontFamily={'Outfit-500'}
                    color={'#6D3BBF'}
                    fontWeight={'semibold'}
                    textAlign={'center'}
                    fontSize={'18px'}
                  >
                    Editar
                  </Text>
                </HStack>
              </Button>
              <Button
                onPress={() => {
                  if (props.vaga?.situacao === 'ATIVO') {
                    mutateAtualizarSituacaoVaga({
                      situacao: 'INATIVO'
                    })
                  } else {
                    mutateAtualizarSituacaoVaga({
                      situacao: 'ATIVO'
                    })
                  }
                }}
                bg={props.vaga?.situacao === 'ATIVO' ? 'white' : '#6D3BBF'}
                borderColor={'#6D3BBF'}
                borderWidth={'2px'}
                rounded={'full'}
                py={'10px'}
                px={'25px'}
                flex={1}
              >
                <HStack
                  space={'10px'}
                  alignItems={'center'}
                  color={props.vaga?.situacao === 'ATIVO' ? '#6D3BBF' : 'white'}
                >
                  <IconDesativarVaga />
                  <Text
                    color={
                      props.vaga?.situacao === 'ATIVO' ? '#6D3BBF' : 'white'
                    }
                    fontFamily={'Outfit-500'}
                    fontSize={'18px'}
                    fontWeight={'semibold'}
                    textAlign={'center'}
                  >
                    Inativar
                  </Text>
                </HStack>
              </Button>
            </HStack>
          </VStack>
        </>
      )}

      <VStack justifyContent={'space-between'} alignItems={'center'}>
        <Text
          fontFamily={'Outfit-500'}
          color={'#868686'}
          fontSize={'13px'}
          fontWeight={'normal'}
        >
          Publicado por{' '}
          <Link
            href={'/perfil?id=' + props.vaga?.id_usuario}
            color={'#535353'}
            fontWeight={'medium'}
          >
            {props.vaga?.usuario?.nome}
          </Link>
        </Text>
        <Text
          fontFamily={'Outfit-500'}
          color={'#868686'}
          fontSize={'13px'}
          fontWeight={'normal'}
        >
          {dayjs(props.vaga?.created_at).format('DD/MM/YYYY')} às{' '}
          {dayjs(props.vaga?.created_at).format('HH:mm')}
        </Text>
      </VStack>
    </VStack>
  )
}

export default CardVaga

const IconMaleta = (props: SvgProps) => (
  <Svg width={33} height={33} fill="none" {...props}>
    <G fill="#2E2E2E" clipPath="url(#a)">
      <Path d="M26.125 5.5h-1.512A6.887 6.887 0 0 0 17.875 0h-2.75a6.887 6.887 0 0 0-6.738 5.5H6.875A6.883 6.883 0 0 0 0 12.375V16.5h33v-4.125A6.883 6.883 0 0 0 26.125 5.5Zm-14.872 0a4.125 4.125 0 0 1 3.872-2.75h2.75a4.125 4.125 0 0 1 3.872 2.75H11.253ZM17.875 20.625a1.375 1.375 0 0 1-2.75 0V19.25H0v6.875A6.883 6.883 0 0 0 6.875 33h19.25A6.883 6.883 0 0 0 33 26.125V19.25H17.875v1.375Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h33v33H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

const IconMatch = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="m9.042 8.409 6.03 5.038L10.8 16.65a3 3 0 0 1-3.6 0L2.6 13.2a2.252 2.252 0 0 0-1.35-.45h-.5A.75.75 0 0 1 0 12V3.703c0-.38.284-.698.663-.74 1.018-.114 1.934-.523 2.872-1.069 1.348-.694 3.117-.446 4.212.58l.463.444L5.204 5.85c-.804.804-.933 2.075-.298 2.954a2.33 2.33 0 0 0 1.833.944c.595 0 1.165-.234 1.578-.647l.725-.694Zm5.924-6.515c-1.268-.634-2.849-.469-3.981.411L6.257 6.92c-.278.28-.341.725-.135 1.01a.751.751 0 0 0 1.145.102L9.98 5.459c.712-.676 1.743.403 1.037 1.084l-.885.822 6.444 5.386h.673a.75.75 0 0 0 .75-.75V3.678a.753.753 0 0 0-.63-.737c-1.271-.23-2.404-1.046-2.404-1.046v-.001Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

const IconPerson = (props: SvgProps) => (
  <Svg width={17} height={16} fill="none" {...props}>
    <G fill="#2E2E2E" clipPath="url(#a)">
      <Path d="M11.364 9.333H5.636a3.63 3.63 0 0 0-2.481.97 3.213 3.213 0 0 0-1.03 2.335V16h12.75v-3.362a3.213 3.213 0 0 0-1.03-2.336 3.63 3.63 0 0 0-2.481-.969ZM8.5 8c2.347 0 4.25-1.79 4.25-4S10.847 0 8.5 0 4.25 1.79 4.25 4 6.153 8 8.5 8Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h17v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

const IconChat = (props: SvgProps) => (
  <Svg width={19} height={18} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#6D3BBF"
        d="M15.256 2.069a8.951 8.951 0 0 0-6.9-1.994A9 9 0 0 0 9.514 18h5.236a3.754 3.754 0 0 0 3.75-3.75V8.435a9.032 9.032 0 0 0-3.244-6.366ZM6.5 5.25h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 1 1 0-1.5Zm6 7.5h-6a.75.75 0 1 1 0-1.5h6a.75.75 0 0 1 0 1.5Zm0-3h-6a.75.75 0 1 1 0-1.5h6a.75.75 0 0 1 0 1.5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h18v18H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
)

const IconEdit = (props: SvgProps) => (
  <Svg width={21} height={22} fill="none" {...props}>
    <G fill="#6D3BBF" clipPath="url(#a)">
      <Path d="M15.75 17.125v4.113a4.346 4.346 0 0 0 1.644-1.019l2.324-2.326a4.336 4.336 0 0 0 1.02-1.643h-4.113a.875.875 0 0 0-.875.875ZM6.276 12.6a3.5 3.5 0 0 0-1.026 2.475v1.175h1.175A3.5 3.5 0 0 0 8.9 15.224l9.912-9.912a1.856 1.856 0 1 0-2.625-2.625L6.275 12.6Z" />
      <Path d="M21 4.833a3.576 3.576 0 0 1-.945 1.717l-9.917 9.913A5.217 5.217 0 0 1 6.425 18H5.25a1.75 1.75 0 0 1-1.75-1.75v-1.175a5.213 5.213 0 0 1 1.538-3.712L14.95 1.45c.47-.47 1.061-.798 1.707-.95H4.375A4.38 4.38 0 0 0 0 4.875v12.25A4.38 4.38 0 0 0 4.375 21.5H14v-4.375a2.625 2.625 0 0 1 2.625-2.625H21V4.833Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h21v21H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

const IconCoracao = (props: { fill: string; borderColor: string }) => {
  return (
    <svg
      width="25"
      height="23"
      viewBox="0 0 25 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.625 4.70125L12.5 6.28202L13.3749 4.70125C13.835 3.86987 14.5064 3.17464 15.3212 2.68576C16.1276 2.20192 17.0462 1.93715 17.9861 1.91741C19.5062 1.99121 20.9368 2.65961 21.969 3.77907C23.0078 4.90579 23.5585 6.39785 23.5007 7.92929L23.5 7.94813V7.96699C23.5 9.9114 22.4628 12.0721 20.8095 14.2438C19.1743 16.3917 17.0363 18.4208 15.0573 20.0808L15.0566 20.0814C14.3406 20.6831 13.4353 21.013 12.5 21.013C11.5647 21.013 10.6593 20.6831 9.9433 20.0814L9.94262 20.0808C7.96364 18.4208 5.82559 16.3917 4.19038 14.2438C2.53714 12.0721 1.49996 9.9114 1.49996 7.96699V7.94813L1.49925 7.92929C1.44146 6.39785 1.99213 4.90579 3.03094 3.77907C4.06308 2.65961 5.49374 1.99121 7.01382 1.91741C7.95368 1.93715 8.8723 2.20192 9.6787 2.68576C10.4935 3.17464 11.1649 3.86987 11.625 4.70125Z"
        stroke={props.borderColor}
        strokeWidth="2"
        fill={props.fill}
      />
    </svg>
  )
}

const IconDesativarVaga = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
    >
      <g clipPath="url(#clip0_38_2731)">
        <path
          d="M14.3426 17.482C14.8706 18.01 14.5864 18.9111 13.8531 19.0467C13.8457 19.0476 13.8384 19.0495 13.8311 19.0504C13.5359 19.1045 13.2297 19.0018 13.0171 18.7891L2.78156 8.55456C2.45065 8.22365 2.41765 7.70023 2.70548 7.33173C2.70915 7.32715 2.71281 7.32165 2.7174 7.31706C3.05748 6.88256 3.7074 6.8459 4.09698 7.2364L14.3426 17.482ZM1.23423 9.60048C1.10315 9.84981 0.994979 10.0716 0.913396 10.2495C0.696146 10.7271 0.696146 11.2743 0.913396 11.7528C0.950979 11.8362 0.999562 11.9352 1.04815 12.0351L6.47023 17.4572C7.18706 18.1741 8.08173 18.6911 9.06715 18.9266C9.14598 18.9459 9.22573 18.9633 9.3064 18.9807C9.79865 19.0871 10.1332 18.5004 9.77756 18.1447L1.23423 9.60048ZM22.4816 20.4355C22.8401 20.7939 22.8401 21.3732 22.4816 21.7316C22.3029 21.9104 22.0682 22.0002 21.8336 22.0002C21.5989 22.0002 21.3642 21.9104 21.1855 21.7316L1.01881 1.56498C0.660396 1.20656 0.660396 0.627229 1.01881 0.268813C1.37723 -0.0896042 1.95656 -0.0896042 2.31498 0.268813L6.22731 4.18115C7.91215 3.23148 9.76748 2.75023 11.7502 2.75023C17.4262 2.75023 20.6602 6.63506 22.082 8.95056C22.9785 10.4099 22.9785 12.2231 22.082 13.6824C21.5026 14.6256 20.5438 15.9493 19.1688 17.1226L22.4816 20.4355ZM8.56573 6.51956L9.8894 7.84323C10.4357 7.51965 11.0719 7.33448 11.7511 7.33448C13.7733 7.33448 15.4178 8.97898 15.4178 11.0011C15.4178 11.6804 15.2317 12.3166 14.9091 12.8629L16.2318 14.1856C16.8726 13.2864 17.2511 12.1873 17.2511 11.0011C17.2511 7.9679 14.7844 5.50115 11.7511 5.50115C10.565 5.50115 9.4659 5.87881 8.56665 6.52048L8.56573 6.51956Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_38_2731">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0.75)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}
