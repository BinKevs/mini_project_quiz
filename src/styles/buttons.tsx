
import styled from 'styled-components';
type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
}
export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    background: ${({correct, userClicked}) => 
       correct ? 
      '#56ffa4' 
      :  !correct && userClicked ?   
      '#ff5656' : 
      '#F4CB04'};
    }
`