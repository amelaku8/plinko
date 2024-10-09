import plinkoLogo from '@images/logo.svg'
import classNames from 'classnames'
import { Gift } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { WalletCard } from '../WalletCard'

export function Navbar() {
  const inGameBallsCount = useSelector(state => state.games)
  const currentBalance = useSelector(state => state.user.balance)


  return (
    <nav className="sticky top-0 z-50 bg-primary px-4 shadow-lg">
      <div
        className={classNames(
          'mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between'

        )}
      >
        <Link to={inGameBallsCount ? '#!' : '/'}>
          <img src={plinkoLogo} alt="" className="w-32 md:w-40" />
        </Link>
        {true && (
          <div className="flex items-stretch gap-4">
            {currentBalance < 10 && (
              <Link
                replace
                to={inGameBallsCount ? '#!' : '/gifts'}
                title="Presente"
                className="animate-bounce text-text transition-colors hover:text-purple "
              >
                <Gift size="32" weight="fill" />
              </Link>
            )}

            <WalletCard balance={currentBalance} showFormatted />
          </div>
        )}
      </div>
    </nav>
  )
}
