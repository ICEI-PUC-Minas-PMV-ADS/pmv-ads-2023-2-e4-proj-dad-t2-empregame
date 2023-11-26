import { ClipPath, Defs, G, Path, Rect, Svg, SvgProps } from "react-native-svg";

export const IconClose = (props: SvgProps) => (
  <Svg width={11} height={12} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="M6.472 6 10.8 1.674a.688.688 0 0 0-.973-.973L5.5 5.028 1.174.7a.688.688 0 1 0-.973.973L4.528 6 .2 10.326a.688.688 0 0 0 .973.973L5.5 6.972 9.826 11.3a.688.688 0 0 0 .973-.973L6.472 6Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h11v11H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const IconMais = (props: SvgProps) => (
  <Svg width={13} height={12} fill="none" {...props}>
    <Path
      fill="#5A2DA4"
      d="M12.188 5.25H7.311V.75C7.313.336 6.95 0 6.5 0c-.449 0-.813.336-.813.75v4.5H.813C.364 5.25 0 5.586 0 6s.364.75.813.75h4.875v4.5c0 .414.363.75.812.75.449 0 .813-.336.813-.75v-4.5h4.875c.448 0 .812-.336.812-.75s-.364-.75-.813-.75Z"
    />
  </Svg>
);

export const IconMaleta = (props: SvgProps) => (
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
);

export const IconMatch = (props: SvgProps) => (
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
);

export const IconPerson = (props: SvgProps) => (
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
);

export const IconChat = (props: SvgProps) => (
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
);

export const IconEdit = (props: SvgProps) => (
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
);

export const IconCoracao = (props: { fill: string; borderColor: string }) => {
  return (
    <Svg width={25} height={23} fill="none">
      <Path
        d="M11.625 4.70125L12.5 6.28202L13.3749 4.70125C13.835 3.86987 14.5064 3.17464 15.3212 2.68576C16.1276 2.20192 17.0462 1.93715 17.9861 1.91741C19.5062 1.99121 20.9368 2.65961 21.969 3.77907C23.0078 4.90579 23.5585 6.39785 23.5007 7.92929L23.5 7.94813V7.96699C23.5 9.9114 22.4628 12.0721 20.8095 14.2438C19.1743 16.3917 17.0363 18.4208 15.0573 20.0808L15.0566 20.0814C14.3406 20.6831 13.4353 21.013 12.5 21.013C11.5647 21.013 10.6593 20.6831 9.9433 20.0814L9.94262 20.0808C7.96364 18.4208 5.82559 16.3917 4.19038 14.2438C2.53714 12.0721 1.49996 9.9114 1.49996 7.96699V7.94813L1.49925 7.92929C1.44146 6.39785 1.99213 4.90579 3.03094 3.77907C4.06308 2.65961 5.49374 1.99121 7.01382 1.91741C7.95368 1.93715 8.8723 2.20192 9.6787 2.68576C10.4935 3.17464 11.1649 3.86987 11.625 4.70125Z"
        stroke={props.borderColor}
        strokeWidth="2"
        fill={props.fill}
      />
    </Svg>
  );
};

export const IconDesativarVaga = (props: { fill: string }) => {
  return (
    <Svg width={22} height={22}>
      <G clipPath="url(#a)">
        <Path
          fill={props.fill}
          d="M13.593 17.482a.926.926 0 0 1-.49 1.565l-.022.003a.925.925 0 0 1-.814-.26L2.032 8.554a.923.923 0 0 1-.077-1.223l.012-.015a.925.925 0 0 1 1.38-.08l10.246 10.245ZM.484 9.6c-.13.25-.239.472-.32.65a1.815 1.815 0 0 0 0 1.503c.037.083.086.182.134.282l5.422 5.422a5.487 5.487 0 0 0 2.836 1.524c.493.106.827-.48.472-.836L.484 9.6Zm21.248 10.836a.915.915 0 1 1-1.296 1.296L.268 1.565A.916.916 0 1 1 1.565.269L5.477 4.18c1.685-.95 3.54-1.43 5.523-1.43 5.676 0 8.91 3.884 10.332 6.2a4.499 4.499 0 0 1 0 4.731c-.58.944-1.538 2.267-2.913 3.44l3.313 3.314ZM7.816 6.52l1.323 1.323a3.64 3.64 0 0 1 1.862-.509 3.67 3.67 0 0 1 3.667 3.667 3.65 3.65 0 0 1-.509 1.862l1.323 1.323A5.47 5.47 0 0 0 16.502 11c0-3.033-2.468-5.5-5.5-5.5a5.464 5.464 0 0 0-3.185 1.02l-.001-.001Z"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h22v22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export const IconOlhoSenha = (props: { fill: string }) => (
  <Svg width={"19px"} height={"18px"}>
    <Path
      fill={props.fill}
      d="M18.858 8.386c-.695-1.44-3.42-6.136-9.358-6.136C3.563 2.25.837 6.946.142 8.386a1.412 1.412 0 0 0 0 1.23c.695 1.438 3.42 6.134 9.358 6.134 5.938 0 8.663-4.696 9.358-6.136a1.411 1.411 0 0 0 0-1.228ZM9.5 13.5a4.94 4.94 0 0 1-2.639-.758 4.562 4.562 0 0 1-1.75-2.02 4.28 4.28 0 0 1-.27-2.6 4.432 4.432 0 0 1 1.3-2.304 4.837 4.837 0 0 1 2.432-1.232 4.996 4.996 0 0 1 2.745.257c.868.34 1.61.917 2.132 1.657.521.74.8 1.61.8 2.5a4.388 4.388 0 0 1-1.393 3.18A4.892 4.892 0 0 1 9.5 13.5Z"
    />
    <Path
      fill={props.fill}
      d="M9.5 12c1.749 0 3.167-1.343 3.167-3S11.249 6 9.5 6C7.751 6 6.333 7.343 6.333 9s1.418 3 3.167 3Z"
    />
  </Svg>
);

export const DropdownIcon = (props: { fill?: string }) => (
  <Svg width={22} height={22} fill="none">
    <Path
      fill={props.fill ? props.fill : "white"}
      d="M17.473 7.2a1.375 1.375 0 0 0-1.945 0l-4.204 4.203a.458.458 0 0 1-.648 0L6.473 7.2a1.375 1.375 0 0 0-1.945 1.944l4.203 4.204a3.208 3.208 0 0 0 4.538 0l4.204-4.204a1.375 1.375 0 0 0 0-1.944Z"
    />
  </Svg>
);

export const IconVagas = (props: { color: string }) => (
  <Svg width={20} height={18} fill="none">
    <G fill={props.color} clipPath="url(#a)">
      <Path d="M15.542 3h-.871A3.729 3.729 0 0 0 13.294.847 4.103 4.103 0 0 0 10.792 0H9.208c-.912.001-1.796.3-2.502.847A3.729 3.729 0 0 0 5.329 3h-.87A4.077 4.077 0 0 0 1.66 4.1 3.657 3.657 0 0 0 .5 6.75V9h19V6.75a3.657 3.657 0 0 0-1.16-2.65A4.077 4.077 0 0 0 15.541 3ZM6.979 3c.163-.437.465-.816.864-1.084.399-.269.876-.414 1.365-.416h1.584c.49.002.966.147 1.365.416.4.268.7.647.864 1.084H6.979ZM10.792 11.25a.73.73 0 0 1-.232.53.814.814 0 0 1-.56.22.814.814 0 0 1-.56-.22.73.73 0 0 1-.232-.53v-.75H.5v3.75a3.657 3.657 0 0 0 1.16 2.65A4.077 4.077 0 0 0 4.459 18h11.084a4.077 4.077 0 0 0 2.797-1.1 3.657 3.657 0 0 0 1.161-2.65V10.5h-8.708v.75Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h19v18H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const IconVagasInteressei = (props: { color: string }) => (
  <Svg width={21} height={20} fill="none">
    <G clipPath="url(#a)">
      <Path
        fill={props.color}
        d="M15.083 1.598a5.333 5.333 0 0 0-4.583 2.75 5.334 5.334 0 0 0-4.583-2.75A5.667 5.667 0 0 0 .5 7.473c0 3.789 3.988 7.927 7.333 10.733a4.145 4.145 0 0 0 5.333 0C16.512 15.4 20.5 11.262 20.5 7.473a5.667 5.667 0 0 0-5.417-5.875Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h20v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const IconHamburguer = (props: SvgProps) => (
  <Svg width={17} height={12} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M15.232 4.981h-14a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2ZM1.232 2.314h14a1 1 0 1 0 0-2h-14a1 1 0 0 0 0 2ZM15.232 9.647h-14a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z"
    />
  </Svg>
);

export const IconVoltar = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      fill="#2E2E2E"
      d="M15.681 1.317c0 .348-.139.682-.385.927L8.583 8.957a2.188 2.188 0 0 0 0 3.095l6.704 6.704a1.312 1.312 0 0 1-1.856 1.856l-6.704-6.7a4.818 4.818 0 0 1 0-6.806L13.44.389a1.312 1.312 0 0 1 2.241.928Z"
    />
  </Svg>
);

export const IconLink = (props: SvgProps) => (
  <Svg width={16} height={18} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#492387"
        d="M12 13.604c0 2.146-1.647 3.896-3.667 3.896H3.667C1.647 17.5 0 15.75 0 13.604V8.646C0 6.5 1.647 4.75 3.667 4.75c.553 0 1 .475 1 1.063 0 .587-.447 1.062-1 1.062-.92 0-1.667.793-1.667 1.77v4.96c0 .977.747 1.77 1.667 1.77h4.666c.92 0 1.667-.793 1.667-1.77 0-.589.447-1.063 1-1.063.553 0 1 .474 1 1.062Zm3.333-9.527L12.387.826a.954.954 0 0 0-1.414-.028c-.4.41-.413 1.076-.026 1.501l2.22 2.451H9c-2.02 0-3.667 1.75-3.667 3.896v3.541c0 .588.447 1.063 1 1.063.554 0 1-.475 1-1.063V8.646c0-.978.747-1.771 1.667-1.771h4.167l-2.22 2.45c-.38.426-.374 1.099.026 1.503a.957.957 0 0 0 1.413-.028l2.927-3.23c.914-.964.914-2.544.014-3.493h.006Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h16v17H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const IconStar = (props: { fill: string }) => (
  <Svg width={16} height={16} fill="none">
    <G clipPath="url(#a)">
      <Path
        fill={props.fill}
        d="M.885 8.267 3.258 10l-.901 2.792a2.119 2.119 0 0 0 .789 2.408 2.118 2.118 0 0 0 2.533-.012L8 13.48l2.322 1.706a2.15 2.15 0 0 0 3.322-2.394L12.742 10l2.373-1.733a2.151 2.151 0 0 0-1.266-3.888h-2.916l-.884-2.757a2.152 2.152 0 0 0-4.098 0l-.884 2.757H2.154A2.151 2.151 0 0 0 .887 8.267H.885Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const IconCandidatos = (props: { color: string }) => (
  <Svg width={21} height={20} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color}
        d="M6.75 10.833a3.75 3.75 0 1 1 0-7.499 3.75 3.75 0 0 1 0 7.5ZM12.167 20H1.333a.833.833 0 0 1-.833-.833v-.417a6.25 6.25 0 0 1 12.5 0v.417a.833.833 0 0 1-.833.833Zm2.916-12.5a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5ZM13.9 9.184a5.687 5.687 0 0 0-3.891 2.36 7.948 7.948 0 0 1 4.095 4.29h5.564A.834.834 0 0 0 20.5 15v-.032a5.84 5.84 0 0 0-6.6-5.784Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h20v20H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const IconPublicarVaga = (props: SvgProps) => (
  <Svg width={24} height={26} fill="none" {...props}>
    <G fill="#6D3BBF" clipPath="url(#a)">
      <Path d="M21 6.75h-3a6.384 6.384 0 0 0-1.757-4.42A5.88 5.88 0 0 0 12 .5a5.88 5.88 0 0 0-4.243 1.83A6.385 6.385 0 0 0 6 6.75H3a2.94 2.94 0 0 0-2.121.915A3.192 3.192 0 0 0 0 9.875v10.417a5.327 5.327 0 0 0 1.466 3.68A4.907 4.907 0 0 0 5 25.5h11.686a6.128 6.128 0 0 1-1.745-1.808 6.403 6.403 0 0 1-.9-2.386 6.505 6.505 0 0 1 .094-2.562 6.36 6.36 0 0 1 1.074-2.306 6.072 6.072 0 0 1 1.872-1.664 5.774 5.774 0 0 1 4.8-.434c.785.277 1.506.72 2.119 1.303V9.875c0-.829-.316-1.624-.879-2.21A2.94 2.94 0 0 0 21 6.75Zm-13 0c0-1.105.421-2.165 1.172-2.946A3.92 3.92 0 0 1 12 2.584a3.92 3.92 0 0 1 2.828 1.22A4.256 4.256 0 0 1 16 6.75H8Z" />
      <Path d="M23 19.25h-2v-2.083c0-.277-.105-.542-.293-.737a.98.98 0 0 0-.707-.305.98.98 0 0 0-.707.305c-.188.195-.293.46-.293.737v2.083h-2a.98.98 0 0 0-.707.305c-.188.195-.293.46-.293.737 0 .276.105.54.293.736a.98.98 0 0 0 .707.305h2v2.084c0 .276.105.54.293.736a.98.98 0 0 0 .707.305.98.98 0 0 0 .707-.305c.188-.195.293-.46.293-.736v-2.084h2a.98.98 0 0 0 .707-.305c.188-.195.293-.46.293-.736 0-.277-.105-.542-.293-.737A.98.98 0 0 0 23 19.25Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h24v25H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const IconLink2 = (props: SvgProps) => (
  <Svg width={13} height={14} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#2E2E2E"
        d="M9.75 10.791C9.75 12.56 8.412 14 6.77 14H2.98C1.337 14 0 12.559 0 10.79V6.708C0 4.94 1.338 3.5 2.98 3.5c.449 0 .812.39.812.875 0 .484-.363.875-.813.875-.747 0-1.354.653-1.354 1.458v4.083c0 .805.607 1.459 1.354 1.459h3.792c.747 0 1.354-.654 1.354-1.459 0-.484.363-.875.813-.875.45 0 .812.391.812.875Zm2.708-7.845L10.064.268A.768.768 0 0 0 8.916.245a.918.918 0 0 0-.022 1.236L10.698 3.5H7.312c-1.64 0-2.979 1.44-2.979 3.208v2.917c0 .484.363.875.813.875.45 0 .812-.391.812-.875V6.708c0-.805.607-1.458 1.354-1.458h3.386L8.894 7.268a.923.923 0 0 0 .022 1.237.773.773 0 0 0 1.148-.023l2.378-2.66c.742-.794.742-2.095.01-2.876h.006Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13v14H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export const IconInteressei = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        d="m9.042 8.408 6.03 5.039L10.8 16.65a3 3 0 0 1-3.6 0L2.6 13.2a2.252 2.252 0 0 0-1.35-.45h-.5A.75.75 0 0 1 0 12V3.703c0-.381.284-.699.663-.741 1.018-.114 1.934-.522 2.872-1.068 1.348-.694 3.117-.447 4.212.579l.463.444-3.006 2.934c-.804.804-.933 2.075-.298 2.953a2.33 2.33 0 0 0 1.833.944c.595 0 1.165-.234 1.578-.647l.725-.694v.001Zm5.924-6.514c-1.268-.634-2.849-.47-3.981.41L6.257 6.92c-.278.279-.341.725-.135 1.01a.751.751 0 0 0 1.145.101L9.98 5.458c.712-.675 1.743.403 1.037 1.084l-.885.823 6.444 5.386h.673A.75.75 0 0 0 18 12V3.677a.753.753 0 0 0-.63-.736c-1.271-.23-2.404-1.047-2.404-1.047Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
