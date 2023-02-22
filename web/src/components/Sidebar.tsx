import { Dialog } from '@headlessui/react';
import React from 'react';
import { FormEvent, useState } from 'react';
import { FaHistory, FaList, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { GiReceiveMoney, GiPayMoney, GiTakeMyMoney } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

interface INavItem {
  name: string;
  icon: JSX.Element;
  href: string;
}

const navigation: INavItem[] = [
  {
    name: 'Transaction History',
    icon: <FaHistory />,
    href: '/transactions',
  },
  {
    name: 'Deposit',
    icon: <GiReceiveMoney />,
    href: '/deposit',
  },
  {
    name: 'Withdraw',
    icon: <GiPayMoney />,
    href: '/withdraw',
  },
  {
    name: 'Loan',
    icon: <GiTakeMyMoney />,
    href: '/loan',
  },
  {
    name: 'Logout',
    icon: <FaSignOutAlt />,
    href: '/logout',
  },
];

const activeStyle =
  'flex items-center gap-2 rounded-lg px-4 py-2 transition ease-in-out bg-white text-indigo-600';
const inactiveStyle =
  'flex items-center gap-2 rounded-lg px-4 py-2 transition ease-in-out hover:text-indigo-200';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Menu para telas grandes*/}
      <aside className='hidden min-h-screen max-w-xs flex-col gap-3 bg-indigo-600 p-3 pt-10 text-white shadow-lg lg:flex'>
        {/* Seção do perfil do usuario */}
        <div className='flex items-center gap-2 px-2'>
          <FaUserCircle size={32} />
          <div className='flex flex-col'>
            <span className='brea-all'>
              Hello, <span className='font-bold'>name</span>
            </span>
            <span className='text-sm font-bold text-white'>
              Balance: <span className='font-bold'>$0,00</span>
            </span>
          </div>
        </div>

        <hr />

        {/* Seção de navegação */}
        <NavItems />
      </aside>

      {/* Header para telas pequenas*/}
      <nav className='min-w-screen flex justify-between gap-2 bg-indigo-600 p-3 lg:hidden'>
        <button
          className='hover:text-primary flex items-center gap-1 rounded-md bg-white p-2 text-indigo-600'
          onClick={() => setIsMenuOpen(true)}
        >
          <FaList size={16} />
        </button>

        <div className='flex items-center justify-center gap-1'>
          <span className='text-sm font-bold text-white'>name</span>
          <FaUserCircle size={24} color='white' />
        </div>
      </nav>

      {/* Menu lateral */}
      <Dialog
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        className='fixed inset-0 flex rounded-md bg-slate-800/70'
      >
        <Dialog.Panel>
          <aside className='flex min-h-screen max-w-xs flex-col gap-3 bg-indigo-600 p-3 pt-8 text-white shadow-lg'>
            <span className='flex items-center gap-2 px-2'>
              Balance: <span className='font-bold'>$0,00</span>
            </span>
            <hr />
            <NavItems />
          </aside>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

const NavItems = () => {
  return (
    <nav className='flex flex-col gap-2'>
      {navigation.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          className={({ isActive }) => {
            return isActive ? activeStyle : inactiveStyle;
          }}
        >
          {item.icon}
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
