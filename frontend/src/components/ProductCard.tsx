import React from 'react';
import { Card, Button, Rate, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ShoppingOutlined, StarOutlined } from '@ant-design/icons';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  rank?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, rank }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(product.purchaseUrl, '_blank');
  };

  return (
    <Card
      hoverable
      className="product-card h-full"
      cover={
        <div className="relative h-48 overflow-hidden">
          {rank && (
            <div className="absolute top-2 left-2 z-10">
              <Tag color="red" className="text-lg font-bold">
                #{rank}
              </Tag>
            </div>
          )}
          <img
            alt={product.name}
            src={product.imageUrl}
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlNWU1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzk5OSI+5Zu+54mH5Zu+5YOPPC90ZXh0Pjwvc3ZnPg==';
            }}
          />
        </div>
      }
      onClick={handleProductClick}
    >
      <Card.Meta
        title={
          <div className="flex justify-between items-start">
            <span className="text-lg font-semibold truncate">{product.name}</span>
            <Tag color="blue">{product.brand}</Tag>
          </div>
        }
        description={
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-red-600 text-xl font-bold">
                ¥{product.price.toLocaleString()}
              </span>
              <div className="flex items-center space-x-1">
                <Rate disabled value={product.rating} className="text-yellow-500" />
                <span className="text-gray-600 text-sm">
                  ({product.reviewCount})
                </span>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="text-gray-500 w-20 flex-shrink-0">{key}:</span>
                  <span className="truncate">{value}</span>
                </div>
              ))}
            </div>

            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              size="small"
              className="w-full"
              onClick={handleBuyClick}
            >
              立即购买
            </Button>
          </div>
        }
      />
    </Card>
  );
};

export default ProductCard;