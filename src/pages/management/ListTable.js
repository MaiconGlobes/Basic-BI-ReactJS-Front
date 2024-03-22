import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, message, Divider } from 'antd';
import Highlighter from 'react-highlight-words';
import instanceAxios from '../../axiosConfig';
import { Popconfirm } from '../../../node_modules/antd/es/index';
import Chip from '@mui/material/Chip';
import { DownloadOutlined } from '@ant-design/icons';
import { Excel } from "antd-table-saveas-excel";
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ListTables = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [convitesStatus, setConvitesStatus] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false); //Usar Context
  const [email, setEmail] = useState('');
  const [confirmado, setConfirmado] = useState(0);
  const [cancelado, setCancelado] = useState(0);
  const [convidado, setConvidado] = useState(0);
  const navigate = useNavigate();
  const defaultFooter = () => (confirmado && cancelado && convidado) ? `👍 ${confirmado}/${convidado} 👎 ${cancelado}/${convidado}` : '';

  const statusText = {
    0: 'Pendente',
    1: 'Enviado',
    2: 'Confirmado',
    3: 'Cancelado',
    true: 'Enviado',
    false: 'Pendente',
    default: 'Undefined'
  };

  const statusColor = {
    0: 'orange',
    1: 'blue',
    2: '#52c41a',
    3: 'red',
    true: 'blue',
    false: 'orange',
    default: 'black'
  };

  const columns_excel = [
    {
      title: 'Apelido',
      dataIndex: 'apelido',
      key: 'apelido',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    }
  ];

  function getStatusColor(status) {
    return statusColor[status] || statusColor.default;
  }

  function getStatusText(text) {
    return statusText[text] || statusText.default;
  }
  
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
        .then((res)=>{
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
          onChange={(e) => {setSelectedKeys(e.target.value ? [e.target.value] : [])}}
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
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
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
    onFilter: (value, record) => console.log(record[dataIndex]),
    //onFilter: (value, record) => record[dataIndex]?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
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
      title: 'Login',
      dataIndex: 'login',
      key: 'apelido',
      width: '10%',
      ...getColumnSearchProps('apelido'),
      sorter: (a, b) => a.apelido.length,
        sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Nome Completo',
      dataIndex: ['person', 'nome'], // Define o dataIndex como um array para acessar a propriedade 'nome' de 'person'
      key: 'person.nome',
      width: '20%',
      // ...getColumnSearchProps('nome'),
      render: (nome) => nome || '', // Renderiza o nome da pessoa, tratando o caso em que nome é undefined
      sorter: (a, b) => (a.person?.nome || '').localeCompare(b.person?.nome || ''), // Usa optional chaining e trata caso de nome undefined
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
      // ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.length,
        sortDirections: ['descend', 'ascend']
    },
     {
      title: 'CPF',
      dataIndex: 'person',
      key: 'person',
      width: '40%',
      render: (person) => person.cpf_cnpj,
      sorter: (a, b) => a.person.cpf_cnpj.localeCompare(b.person.cpf_cnpj),
      sortDirections: ['descend', 'ascend']
     },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'actions',
      width: '10%',
      render: (text, record) => (
        record.status in [0, 1]
          ? <Popconfirm
            placement="topRight"
            title="Confirmação!"
            description={`Deseja enviar convite para ${record.apelido}?`}
            okText="Sim"
            cancelText="Não"
            // onConfirm={() => {
            //   RequestAPI(record.id)
            //     .then((status) => {
            //       setConvitesStatus((prevStatus) => ({ ...prevStatus, [record.id]: status }));
            //     });
            // }}
          >
            <Chip
              label={getStatusText(convitesStatus[record.id] || record.status)}
              sx={{
                borderColor: `${getStatusColor(convitesStatus[record.id] || record.status)}`,
                color: getStatusColor(convitesStatus[record.id] || record.status),
                borderRadius: '50px',
                fontSize: '0.785rem',
                minWidth: '90px'
              }}
              variant="outlined"
            />
          </Popconfirm>
          : <Chip
            label={getStatusText(convitesStatus[record.id] || record.status)}
            sx={{
              borderColor: `${getStatusColor(convitesStatus[record.id] || record.status)}`,
              color: getStatusColor(convitesStatus[record.id] || record.status),
              borderRadius: '50px',
              fontSize: '0.785rem',
              minWidth: '90px'
            }}
            variant="outlined"
          />

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

  const tableProps = {
    footer: defaultFooter
  };

  return (
    <>
      {contextHolder}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: '-25px',
          // py: -5,
        }}
      >
        <Button
          //type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          onClick={handleClick}
        >
          Download Excel
        </Button>
      </Box>

      <Divider />
      <Table
        {...tableProps}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          pageSize: 10,
        }}
      />
    </>
  );
};

export default ListTables;