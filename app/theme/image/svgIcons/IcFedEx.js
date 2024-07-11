import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const FedEx = props => {
  return (
    <Svg
      width={props.width ?? 61}
      height={props.height ?? 17}
      viewBox="0 0 61 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.008.012C3.374-.01 6.741.006 10.108.004a162.27 162.27 0 010 3.685c-1.842.01-3.684.01-5.527 0a96.19 96.19 0 00-.003 2.296c1.696-.011 3.39-.003 5.086-.006.007.676.003 1.353-.001 2.03.39-.554.86-1.05 1.398-1.474a6.354 6.354 0 013.06-1.147c1.096-.061 2.23-.078 3.27.31 1.328.416 2.432 1.382 3.072 2.57.173.33.327.671.46 1.02.448-1.414 1.465-2.672 2.835-3.354a5.687 5.687 0 014.035-.33c.662.202 1.23.603 1.703 1.085.007-2.23.003-4.458.001-6.687 1.343.005 2.684-.012 4.026.01-.03 3.18-.004 6.36-.013 9.539.005 2.271-.01 4.544.007 6.815-1.321.04-2.643.017-3.964.016-.007-.356-.01-.711-.006-1.066l-.034.048c-.607.768-1.46 1.378-2.457 1.565a5.379 5.379 0 01-3.637-.7 5.827 5.827 0 01-2.738-4.272c-2.496-.007-4.992.002-7.488-.006-.14.01-.29-.014-.418.05.027.354.136.696.32 1.003.183.307.435.57.738.77.692.462 1.627.482 2.388.174.334-.17.569-.468.807-.74 1.298.016 2.596-.008 3.894.007-.517 1.322-1.502 2.512-2.842 3.128-1.243.585-2.68.71-4.04.545-1.601-.204-3.121-1.029-4.07-2.296a5.525 5.525 0 01-1.12-3.46c-.024-.54.084-1.072.15-1.607-1.474-.004-2.948 0-4.422-.001a1527 1527 0 000 6.889c-1.524.023-3.048 0-4.572.011C.001 10.954.001 5.482.008.012zm13.819 8.21c-.471.302-.737.803-.91 1.305 1.43.009 2.857.038 4.285 0-.14-.401-.29-.828-.627-1.12-.73-.646-1.934-.745-2.748-.185zm12.752.17c-1.004.234-1.646 1.18-1.779 2.122-.227 1.021.069 2.192.913 2.884.805.672 2.13.635 2.902-.069.725-.73.863-1.819.73-2.782-.123-.654-.36-1.348-.919-1.78-.512-.402-1.212-.5-1.847-.374z"
        fill="#312280"
      />
      <Path
        d="M33.522.012c3.16.011 6.32.011 9.479.001.002 1.222.004 2.442-.002 3.664-1.816.043-3.635.01-5.453.016-.01.767-.07 1.542.044 2.303 1.81-.013 3.619-.005 5.428-.005-.037 1.172.001 2.346-.022 3.52-1.801.007-3.602.003-5.403.001-.116.622-.044 1.256-.063 1.884.002.452-.028.908.058 1.356 1.787-.011 3.576-.024 5.364.003.12.345.02.738.05 1.102.035.787-.084 1.588.093 2.364.647-.616 1.209-1.31 1.846-1.935.533-.654 1.148-1.239 1.706-1.872.367-.402.797-.756 1.103-1.206a1.198 1.198 0 00-.163-.239c-.904-.976-1.81-1.95-2.715-2.924-.597-.694-1.29-1.31-1.84-2.038 1.186-.038 2.375-.008 3.563-.018.485.011.972-.025 1.457.018.868.764 1.543 1.717 2.443 2.453.63-.709 1.293-1.386 1.905-2.109.155-.16.308-.405.573-.362 1.544.011 3.087-.02 4.63.016a5.04 5.04 0 01-.69.824c-1.329 1.442-2.687 2.859-3.988 4.323.472.706 1.169 1.245 1.712 1.902.757.765 1.475 1.564 2.215 2.346.295.335.627.644.867 1.02-1.55.023-3.101 0-4.652.01-.181-.01-.398.03-.534-.117-.755-.818-1.496-1.651-2.28-2.444-.68.747-1.394 1.463-2.047 2.233-.14.15-.277.363-.52.326-6.06.004-12.12.001-18.182-.009-.006-.352-.017-.704.008-1.055l.034-.048c-.003.355-.001.71.006 1.066 1.322 0 2.643.025 3.965-.016-.017-2.271-.002-4.544-.008-6.815.01-3.18-.017-6.36.013-9.539zM59.671 14.303c.638-.184 1.421.382 1.32 1.047.12.809-.986 1.301-1.638.892-.845-.383-.612-1.805.318-1.939zm.011.215c-.355.103-.688.454-.638.832-.048.611.754 1.04 1.29.75.567-.246.634-1.112.13-1.45-.23-.147-.516-.158-.782-.132z"
        fill="#FF5F00"
      />
      <Path
        d="M59.48 14.691c.284.01.595-.055.856.082-.004.368.013.735.05 1.101l-.09.196c-.15-.255-.21-.571-.478-.742-.064.228-.12.46-.183.69-.278-.386-.089-.89-.155-1.327zm.274.24l.013.302.284-.022.036-.274-.333-.006z"
        fill="#FF5F00"
      />
    </Svg>
  );
};
