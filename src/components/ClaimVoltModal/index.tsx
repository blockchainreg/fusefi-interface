import { ChainId } from '@fuseio/fuse-swap-sdk'
import React, { useCallback, useEffect, useState } from 'react'
import { TYPE } from '../../theme'
import Modal from '../Modal'
import { ButtonGradient, ButtonGradientOutline } from '../Button'
import { useClaimModalOpen, useToggleClaimModal, useWalletModalToggle } from '../../state/application/hooks'
import { useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount } from '../../state/claim/hooks'
import { AutoColumn } from '../Column'
import Row, { RowCenter } from '../Row'
import styled from 'styled-components'
import VoltIcon from '../../assets/svg/volt.svg'
import AddressInputPanel from '../AddressInputVolt'
import LargeVolt from '../../assets/svg/voltLarge.svg'
import voltBolt from '../../assets/svg/voltBolt.svg'
import voltAllocation from '../../assets/svg/voltAllocation.svg'
import Underline from '../../assets/svg/underline.svg'
import Airdrop from '../../assets/svg/Airdrop.svg'
import Presale from '../../assets/svg/Presale.svg'
import Ido from '../../assets/svg/IDO.svg'
import { useActiveWeb3React } from '../../hooks'
const Styler = styled.div<{ error: boolean }>`
  padding: 20px;
  :after {
    background: ${({ error }) =>
      error
        ? 'linear-gradient(-91.13deg, #f3fc1f -3.23%, #f3fc1f 26.69%, #3ad8a4 156.49%)'
        : 'linear-gradient(to bottom right, red, yellow)'};
    content: '';
    position: absolute;
    border-radius: 20px;
    width: 99%;
    top: 0;
    bottom: 1px;
    left: -0.15px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`

const InfoText = styled.div`
  font-family: Inter;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #FFFFF;
  padding-left: 10px;
  padding-right: 53px;
  margin-bottom: 20px;
`
const Dot = styled.div<{ error: boolean }>`
  height: 10px;
  width: 10px;
  margin-left: 10px;
  padding-left: 10px;
  background-color: ${({ error }) => (error ? 'red' : 'green')};
  border-radius: 50%;
  display: inline-block;
  margin-right: ${({ error }) => (error ? '6px' : '8px')};
`

const Container = styled.div`
  flex-wrap: wrap;
  display: flex;
`
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: calc(50% - 1em);
  margin: 0.5em;
  padding: 1rem;
  background: black;
  border-radius: 20px;
`

const Main = styled.div`
  position: relative;
  padding: 14px;
  border-radius: 20px;
  min-height: 300px;
  &:before {
    content: '';
    position: absolute;
    top: -17px;
    right: -17px;
    bottom: -17px;
    left: -17px;
    z-index: -1;
    border-radius: 20px;
    background: linear-gradient(-91.13deg, #f3fc1f -3.23%, #f3fc1f 26.69%, #3ad8a4 156.49%);
  }
`

const Header = styled.div`
display: flex;
align-content: flex-end;
align-items: flex-end;
width: 100%;
font-family: Inter;
font-style: normal;
font-weight: 500;
font-size: 18px;
margin-top: 16px;
margin-bottom: 12px;
> img {
  padding-left: 2px;
  padding-right: 12px;
  padding-bottom: 2px;
}
}
`
const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: calc(33% - 1em);
  margin: 0.5em;
  padding: 1rem;
  background: black;
  border-radius: 20px;
`

const Content = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  color: #b5b9d3;
  margin-bottom: 15px;
`

const Volt = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  padding: 6px;
  margin: auto;
`

const Claims = styled.div`
   {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
`
export default function ClaimVoltModal() {
  const [stage, setStage] = useState(0)
  const { account } = useActiveWeb3React()
  const [claimAccount, setClaimAccount] = useState('')
  const claimModalOpen = useClaimModalOpen()
  const toggleClaimModal = useToggleClaimModal()
  const toggleWalletModal = useWalletModalToggle()

  const userUnclaimedAmount = useUserUnclaimedAmount(claimAccount)
  const userHasAvailableClaim = useUserHasAvailableClaim(claimAccount)
  const claimCallback = useClaimCallback(claimAccount)

  const onClaim = useCallback(async () => {
    try {
      await claimCallback()
      toggleClaimModal()
      setClaimAccount('')
    } catch (error) {
      console.error('Failed to claim tokens', error)
    }
  }, [claimCallback, toggleClaimModal])

  useEffect(() => {
    if (account && !userHasAvailableClaim) setClaimAccount(account ? account : '')
    return () => {
      setStage(0)
    }
  }, [account, userHasAvailableClaim])

  return (
    <Modal
      isOpen={claimModalOpen}
      onDismiss={toggleClaimModal}
      backgroundColor={stage === 0 ? 'black' : 'transparent'}
      maxWidth={stage === 0 ? '' : '850px'}
      maxHeight={stage === 0 ? 100 : 850}
    >
      {stage === 0 && (
        <Styler error={claimAccount.length < 7 || userHasAvailableClaim}>
          <AutoColumn gap="sm">
            <Row>
              <img src={VoltIcon} alt="" />
              {userHasAvailableClaim ? (
                <TYPE.largeHeader fontSize={30}>{userUnclaimedAmount?.toSignificant()} VOLT</TYPE.largeHeader>
              ) : (
                <TYPE.largeHeader fontSize={30}>VOLT</TYPE.largeHeader>
              )}
            </Row>
            <RowCenter>
              <InfoText>
                Thanks for being an a user of Fusefi. You are receiving this token for using our service and being a
                early supporter!
              </InfoText>
            </RowCenter>
            <AddressInputPanel readOnly={true} value={claimAccount} onChange={setClaimAccount} chainId={ChainId.FUSE} />
            {claimAccount.length < 7 ? (
              <TYPE.main
                fontSize={14}
                fontWeight={400}
                color="grey"
                textAlign="center"
                margin="0.5rem"
                marginBottom="50px"
              >
                Please, connect your wallet below
                <ButtonGradient onClick={toggleWalletModal}>Connect your wallet</ButtonGradient>
              </TYPE.main>
            ) : (
              [
                !userUnclaimedAmount?.greaterThan('0') && !userHasAvailableClaim ? (
                  <TYPE.main fontSize={14} fontWeight={400} color="#FF0000" marginTop="1rem" marginBottom="50px">
                    <Dot error={true} /> You are not eligible for the airdrop!
                  </TYPE.main>
                ) : (
                  <TYPE.main fontSize={14} fontWeight={400} color="#1AFB2A" marginTop="1rem" marginBottom="50px">
                    <Dot error={false} />
                    You are eligible for the airdprop
                  </TYPE.main>
                )
              ]
            )}
            <Row padding={'10px'}>
              <ButtonGradient
                disabled={!userHasAvailableClaim}
                error={!userHasAvailableClaim && !claimAccount}
                onClick={() => setStage(stage + 1)}
              >
                Start the claiming process
              </ButtonGradient>
            </Row>
          </AutoColumn>
        </Styler>
      )}
      {stage === 1 && (
        <Container>
          <Wrapper>
            <Main>
              <img src={LargeVolt} alt="" style={{ margin: 'auto', display: 'flex' }} />
              <Header>Volt Token (VOLT)</Header>
              <Content>
                The Volt Token is our governance token. It is used predominantly to vote on FuseFi proposals including
                new products and services, The Volt Token is also expected to have other utility within the platform
                such as providing access to premium services and lowering fees on lending and swapping protocols
              </Content>
            </Main>
          </Wrapper>

          <Wrapper>
            <Main>
              <Header>
                <img src={voltBolt} alt="" />
                Why launch a token?{' '}
              </Header>
              <Content>
                FuseFi already incorporates innovative services with tens of thousands of users and millions of dollars
                in total value locked (TVL). In order to scale FuseFi for the masses, a token is need to provide
                governance and and to allow for a growth model to develop that incentivises contributors, technology
                partners and users.{' '}
              </Content>
              <Header>
                <img src={voltBolt} alt="" />
                Why launch it now?{' '}
              </Header>
              <Content>
                DeFi has developed rapidly in the past few years making financial products and service development open
                and accessible and benefiting millions of tech savvy individuals. We believe that the time has come to
                take the power and capabilities of DeFi to the masses with a mobile-led approach that removes complexity
                and provides a truly human friendly experience.{' '}
              </Content>
            </Main>
          </Wrapper>

          <Row margin={'0.5em'} justifyContent={'space-between'}>
            <ButtonGradientOutline maxWidth={100} onClick={() => setStage(stage - 1)}>
              <span>Back</span>
            </ButtonGradientOutline>
            <ButtonGradient maxWidth={100} onClick={() => setStage(stage + 1)}>
              Next
            </ButtonGradient>
          </Row>
        </Container>
      )}

      {stage === 2 && (
        <Container>
          <Wrapper>
            <Main>
              <Header>
                <img src={voltBolt} alt="" />
                How is VOLT distributed?{' '}
              </Header>
              <Content>
                The initial supply of Volt Tokens is 5 billion, minted at the initial token generation event (TGE) and
                allocated towards participants in the initial fundraise (with a 49-week vesting period), an exclusive
                Dutch auction dedicated to Fuse Token holders, and the FuseFi treasury for partnerships,community
                incentives, developments and future airdrops.
              </Content>
              <Content>
                5 billion VOLT tokens are also expected to be minted over the space of 4 yearsin order to incentivize
                liquidity on the platform as as well as to reward DAO members that stake their tokens and participate in
                governance
              </Content>
            </Main>
          </Wrapper>
          <Wrapper>
            <Main style={{ width: '100%' }}>
              <img src={voltAllocation} alt="" style={{ width: '100%' }} />
            </Main>
          </Wrapper>
          <Row margin={'0.5em'} justifyContent={'space-between'}>
            <ButtonGradientOutline maxWidth={100} onClick={() => setStage(stage - 1)}>
              <span>Back</span>
            </ButtonGradientOutline>
            <ButtonGradient maxWidth={100} onClick={() => setStage(stage + 1)}>
              Next
            </ButtonGradient>
          </Row>
        </Container>
      )}

      {stage === 3 && (
        <Claims>
          <Card>
            <Main style={{ width: '100%', margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>
              <img src={Airdrop} alt="" style={{ width: '80%', paddingBottom: '14px', margin: 'auto' }} />
              <img src={VoltIcon} alt="" style={{ width: '65px', paddingBottom: '15px', margin: 'auto' }} />
              <img src={Underline} alt="" style={{ width: '100%', margin: 'auto' }} />
              <Volt>Volt: {userUnclaimedAmount?.toSignificant()}</Volt>
              <img src={Underline} alt="" style={{ width: '100%', margin: 'auto' }} />
              <ButtonGradient maxWidth={'100%'} marginTop={'33px'} onClick={() => onClaim()}>
                Claim
              </ButtonGradient>
            </Main>
          </Card>
          <Card>
            <Main style={{ width: '100%', margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>
              <img src={Presale} alt="" style={{ width: '170px', paddingBottom: '14px', margin: 'auto' }} />
              <img src={VoltIcon} alt="" style={{ width: '65px', paddingBottom: '15px', margin: 'auto' }} />
              <img src={Underline} alt="" style={{ width: '100%', margin: 'auto' }} />
              <Volt>Volt: 000000</Volt>
              <img src={Underline} alt="" style={{ width: '100%', margin: 'auto' }} />
              <ButtonGradient maxWidth={'100%'} marginTop={'33px'} onClick={() => setStage(0)}>
                Claim
              </ButtonGradient>
            </Main>
          </Card>

          <Card>
            <Main style={{ width: '100%', margin: 'auto', display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', width: '100%', margin: 'auto' }}>
                <img src={Ido} alt="" style={{ width: '67px', paddingBottom: '14px', margin: 'auto' }} />
              </div>
              <img src={VoltIcon} alt="" style={{ width: '65px', paddingBottom: '15px', margin: 'auto' }} />
              <img src={Underline} alt="" style={{ width: '100%', margin: 'auto' }} />
              <Volt>Volt: 000000</Volt>
              <img src={Underline} alt="" style={{ width: '100%', margin: 'auto' }} />
              <ButtonGradient maxWidth={'100%'} marginTop={'33px'} onClick={() => setStage(0)}>
                Claim
              </ButtonGradient>
            </Main>
          </Card>
        </Claims>
      )}
    </Modal>
  )
}