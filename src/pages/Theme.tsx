import { Card, Col, Flex, Image, Row, Tag, Typography } from "antd";
import { AnimatePresence } from "framer-motion";
import React, { useMemo } from "react";
import {
  fetchCategoryListWithCount,
  getCategoryListWithCount,
} from "../services";
import GifLoading from "../components/shared/GifLoading";
import { Link } from "react-router-dom";
import { themes } from "../assets/images";

export const Theme = () => {
  const { categories, isLoading } = fetchCategoryListWithCount();

  return (
    <div className="p-5">
      {isLoading && <GifLoading />}
      {/* Sort Option List */}
      <div className="my-14 w-full md:mx-14 xl:mx-32">
        <Typography.Title level={2}>All available Themes</Typography.Title>
      </div>

      {/* Product List */}
      <div className="mx-20">
        <AnimatePresence>
          <Row align={"middle"} gutter={[32, 32]}>
            {categories?.map((category, index) => (
              <Col sm={24} md={12} lg={8} xl={6} key={index}>
                <Link to={`${category.id}`} key={category.id}>
                  <Card
                    cover={
                      <img
                        src={themes?.[(category?.name as string) ?? ""]}
                        alt={category.name}
                      />
                    }
                    hoverable
                    className="relative"
                    extra={
                      <Tag color="yellow" className="text-base">{`${
                        category?.productCount ?? 0
                      } Sets`}</Tag>
                    }
                  >
                    <Card.Meta
                      title={
                        <Typography.Text className="text-base font-semibold lg:text-lg">
                          {category?.name}
                        </Typography.Text>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </AnimatePresence>
      </div>
    </div>
  );
};
