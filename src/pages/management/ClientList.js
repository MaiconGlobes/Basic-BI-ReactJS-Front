import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Popconfirm } from '../../../node_modules/antd/es/index';
import { DownloadOutlined } from '@ant-design/icons';
import { Excel } from "antd-table-saveas-excel";
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Space, Table, Divider } from 'antd';
import Chip from '@mui/material/Chip';
import Highlighter from 'react-highlight-words';
import instanceAxios from '../../axios-config';
import Cookies from 'js-cookie';
import MainCard from 'components/MainCard';

const ClientList = () => {
   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef(null);
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const columns_excel = [
      {
         title: 'Telefone',
         dataIndex: 'telefone',
         key: 'telefone',
      }
   ];

   useEffect(() => {
      setLoading(true);

      const fetchData = async () => {
         try {
            const token = Cookies.get('_hasch_tk');

            if (!token) {
               navigate('/login');
               return;
            }

            await instanceAxios.get('/user/all')
               .then((res) => {
                  //Lançar em um lugar global para todas as rotas
                  if (res?.data?.retorno?.dados?.token) {
                     const expires = new Date();
                     expires.setDate(expires.getDate() + 365);
                     Cookies.set('_hasch_tk', res?.data?.retorno.dados.token, { expires });
                  }

                  if (res?.data?.retorno?.dados?.usuario) {
                     setLoading(false);
                     setData(res?.data?.retorno?.dados?.usuario);
                  }
               })

         } catch (error) {
            console.log(error);
            navigate('/login');
         }
      };

      fetchData();
   }, [navigate]);

   const handleSearch = (selectedKeys, confirm, dataIndex) => {
      console.log(dataIndex);
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
   };

   const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
   };

   const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
         <div
            style={{
               padding: 8
            }}
            onKeyDown={(e) => e.stopPropagation()}
         >
            <Input
               ref={searchInput}
               placeholder={`Procurar ${dataIndex}`}
               value={selectedKeys[0]}
               onChange={(e) => { setSelectedKeys(e.target.value ? [e.target.value] : []) }}
               onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
               style={{
                  marginBottom: 8,
                  display: 'block'
               }}
            />
            <Space>
               <Button
                  type="primary"
                  onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                  icon={<SearchOutlined />}
                  size="small"
                  style={{
                     width: '100%'
                  }}
               >
                  Procurar
               </Button>
               <Button
                  onClick={() => clearFilters && handleReset(clearFilters)}
                  size="small"
                  style={{
                     width: '100%'
                  }}
               >
                  Limpar
               </Button>
               <Button
                  type="link"
                  size="small"
                  onClick={() => {
                     close();
                  }}
               >
                  Fechar
               </Button>
            </Space>
         </div>
      ),
      filterIcon: (filtered) => (
         <SearchOutlined
            style={{
               color: filtered ? '#1890ff' : undefined
            }}
         />
      ),
      onFilter: (value, record) => record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
         if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
         }
      },
      render: (text) =>
         searchedColumn === dataIndex ? (
            <Highlighter
               highlightStyle={{
                  backgroundColor: '#ffc069',
                  padding: 0
               }}
               searchWords={[searchText]}
               autoEscape
               textToHighlight={text ? text.toString() : ''}
            />
         ) : (
            text
         )
   });

   const columns = [
      {
         title: 'Id',
         dataIndex: 'id',
         key: 'id',
         width: '10%',
         sorter: (a, b) => a.apelido.length,
         sortDirections: ['descend', 'ascend']
      },
      {
         title: 'Nome Completo',
         dataIndex: ['person', 'nome'],
         key: 'person.nome',
         width: '20%',
         ...getColumnSearchProps('nome'),
         render: (nome) => nome || '',
         sorter: (a, b) => (a.person?.nome || '').localeCompare(b.person?.nome || ''),
         sortDirections: ['descend', 'ascend']
      },
      {
         title: 'CPF',
         dataIndex: 'person',
         key: 'person',
         width: '15%',
         render: (person) => person.cpf_cnpj,
         sorter: (a, b) => a.person.cpf_cnpj.localeCompare(b.person.cpf_cnpj),
         sortDirections: ['descend', 'ascend']
      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
         width: '40%',
         // ...getColumnSearchProps('email'),
         sorter: (a, b) => a.email.length,
         sortDirections: ['descend', 'ascend']
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'actions',
         width: '10%',
         render: (text, record) => (
            <Popconfirm
               placement="topRight"
               title="Confirmação!"
               description={`Deseja realmente excluir o registro?`}
               okText="Sim"
               cancelText="Não"
               onConfirm={() => {
                  // RequestAPI(record.id)
                  //   .then((status) => {
                  //     setConvitesStatus((prevStatus) => ({ ...prevStatus, [record.id]: status }));
                  //   });
               }}
            >
               <Chip
                  label='Deletar'
                  sx={{
                     borderColor: 'red',
                     color: 'red',
                     borderRadius: '50px',
                     fontSize: '0.785rem',
                     minWidth: '90px'
                  }}
                  variant="outlined"
               />
            </Popconfirm>
         )
      }
   ];

   const handleClick = () => {
      const excel = new Excel();
      excel
         .addSheet("test")
         .addColumns(columns_excel)
         .addDataSource(data, {
            str2Percent: false
         })
         .saveAs("Excel.xls");
   };

   return (
      <>
         <MainCard title="Sample Card">

            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: '-25px',
               }}
            >
               <Button
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                  onClick={handleClick}
               >
                  Baixar planilha
               </Button>
            </Box>

            <Divider />
            <Table
               columns={columns}
               dataSource={data}
               loading={loading}
               pagination={{
                  pageSize: 10,
               }}
            />
         </MainCard>
      </>
   );
};

export default ClientList;