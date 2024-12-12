import { useEffect, useState } from 'react';
import CreateProductForm from './CreateProductForm/CreateProductForm';
import './seller.scss';
import { useNavigate } from 'react-router-dom';
import { deleteFoodsByApi } from '../../../api/foods';
import Modal from '../../Modal/DeleteModal';
import { loadImage } from '../../../hook/loadImage';

function Seller({ profileData }: any) {
    const navigate = useNavigate();
    const [foodsData, setFoodsData] = useState<any[]>([]);
    const { profile } = profileData;
    const { user, foods } = profile;
    const [isOpenCreateProductForm, setIsOpenCreateProductForm] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState({ state: false, id: null });
    const [imageLoading, setImageLoading] = useState(true);


    useEffect(() => {
        if (foods) {
            setFoodsData(foods);
        }
    }, [foods]);

    useEffect(() => {

        const fetchImage = async () => {
            if (user?.photo_url) {

                setImageLoading(false);
            } else {
                setImageLoading(false); 
            }
        };
        fetchImage();
    }, [user]);

    async function deleteFoods(id: number) {
        const newFoods = foodsData.filter((item: any) => item.id !== id);
        setFoodsData(newFoods);
        setIsOpenDeleteModal({ state: false, id: null });
        await deleteFoodsByApi({ id: id });
    }

    return (
        <div className='seller'>
            {isOpenDeleteModal.state && (
                <Modal
                    text='Вы точно хотите удалить?'
                    setIsOpenDeleteModal={setIsOpenDeleteModal}
                    deleteFoods={deleteFoods}
                    id={isOpenDeleteModal.id}
                />
            )}
            {isOpenCreateProductForm && <CreateProductForm setIsOpenCreateProductForm={setIsOpenCreateProductForm} />}
            <div className="rounded-md max-w-full pb-16 bg-white shadow-xl text-gray-900">
                <div className="h-32 overflow-hidden">
                    <img
                        className="object-cover object-top w-full"
                        src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
                        alt='Mountain'
                    />
                </div>
                <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    {imageLoading && <p>Loading...</p>}

                        <img
                            className="object-cover object-center h-32"
                            src={user?.photo_url || './images/person.webp'} 
                            alt={user?.first_name || 'User Photo'}
                            onLoad={() => setImageLoading(false)}
                            onError={() => {
                                setImageLoading(false);
                            }}
                        />
               
                </div>
                <div className="text-center mt-2">
                    <h2 className="font-semibold">{user?.first_name}</h2>
                </div>

                {user && user.locations && (
                    <div className="btn-wrapper mt-6">
                        {!user.locations.length ? (
                            <p>Добавьте свой адрес в настройках</p>
                        ) : (
                            <button onClick={() => navigate('/profile/create-product')}>Добавить продукт</button>
                        )}
                    </div>
                )}
                <ul className='mt-20 px-1'>
                    <li className='mb-2'>Мои Продукты</li>
                    {!foodsData[0] && <li>Пока что тут нету продуктов:(</li>}
                    {foodsData?.map((product: any, index: number) => (
                        <li key={index}>
                            <div className="product">
                                <div className="product--info">
                                    <img style={{ width: 'auto', height: '75px', borderRadius: '5px' }} src="./images/food.jpg" alt="" />
                                    <p>{product.title}</p>
                                </div>
                                <div className="btn--wrapper">
                                    <button
                                        className='edit bg-orange-400'
                                        onClick={() => navigate(`/profile/edit-product/${product.id}`)}
                                    >
                                        Изменить
                                    </button>
                                    <button className='delete bg-red-600' onClick={() => setIsOpenDeleteModal({ state: true, id: product.id })}>Удалить</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Seller;