import React, { useState, useRef, useEffect } from "react";
import { getCategoryList, CategoryType } from "../services";
import { SortOptionType } from "../constants";
import SortMenu from "../components/Menu/SortMenu";
import {
  Button,
  Col,
  FloatButton,
  InputNumber,
  Modal,
  Radio,
  Row,
  Slider,
  Tooltip,
  Typography,
} from "antd";
import {
  ControlOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  SortAscendingOutlined,
} from "@ant-design/icons";
import { useBoolean } from "usehooks-ts";

type SortListType = {
  name: string;
  options: string[];
  label: string;
};

const sortOptions: SortListType[] = [
  {
    name: "price",
    label: "Price",
    options: ["Ascending", "Descending", "Default"],
  },
  {
    name: "rate",
    label: "Rating",
    options: ["Ascending", "Descending", "Default"],
  },
  {
    name: "year",
    label: "Year",
    options: ["Ascending", "Descending", "Default"],
  },
  {
    name: "discountPercentage",
    label: "Discount",
    options: ["Ascending", "Descending", "Default"],
  },
];

export const selectSortMenu = () => {
  const [selectedSort, setSelectedSort] = useState<SortOptionType>();
  const [selectedFilter, setSelectedFilter] = useState({});
  const [isReset, setIsReset] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>();
  const [priceRange, setPriceRange] = useState([50000, 30000000]);
  const lastChangedIndex = useRef(-1);
  const filterModalVisibility = useBoolean(false);
  const sortModalVisibility = useBoolean(false);

  const handleSortChange = (
    optionName: string,
    selectedOption: string,
    index: number
  ) => {
    setSelectedSort({ sortBy: optionName, sortDirection: selectedOption });

    if (lastChangedIndex.current !== -1) {
      const resetIndex =
        lastChangedIndex.current !== index ? lastChangedIndex.current : -1;
      lastChangedIndex.current = index;
      setIsReset(resetIndex !== -1);

      return resetIndex;
    }
    lastChangedIndex.current = index;

    return -1;
  };

  const renderSelectSortMenu = () => {
    return (
      <div>
        <Modal
          onCancel={() => filterModalVisibility.setFalse()}
          open={filterModalVisibility.value}
          footer={[
            <Button
              onClick={() => {
                setSelectedFilter({
                  ...selectedFilter,
                  year: selectedYear,
                  minPrice: priceRange[0],
                  maxPrice: priceRange[1],
                });
                filterModalVisibility.setFalse();
              }}
            >
              Confirm
            </Button>,
          ]}
        >
          <Typography.Title level={5}>Filter Option</Typography.Title>
          <Row gutter={[16, 16]} className="w-full">
            <Col span={24}>
              <Typography.Title level={5}>Year</Typography.Title>
              <Radio.Group
                onChange={(e) => setSelectedYear(e.target.value)}
                value={selectedYear}
              >
                <Row gutter={[32, 32]}>
                  {[2020, 2021, 2022, 2023, 2024].map((year, index) => (
                    <Col span={4} key={index}>
                      <Radio value={year}>{year}</Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Col>
            <Col span={24}>
              <Typography.Title level={5} style={{ marginTop: 16 }}>
                Price Range
              </Typography.Title>
              <Row>
                <Col span={10}>
                  <InputNumber
                    min={50000}
                    max={30000000}
                    style={{ width: "100%" }}
                    value={priceRange[0]}
                    onChange={(value) =>
                      setPriceRange([value as number, priceRange[1]])
                    }
                  />
                </Col>
                <Col span={4} style={{ textAlign: "center" }}>
                  to
                </Col>
                <Col span={10}>
                  <InputNumber
                    min={50001}
                    max={30000000}
                    style={{ width: "100%" }}
                    value={priceRange[1]}
                    onChange={(value) =>
                      setPriceRange([priceRange[0], value as number])
                    }
                  />
                </Col>
              </Row>
              <Slider
                range
                min={50000}
                max={30000000}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
                style={{ marginTop: 16 }}
              />
            </Col>
          </Row>
        </Modal>

        <Modal
          onCancel={() => sortModalVisibility.setFalse()}
          open={sortModalVisibility.value}
          footer={[
            <Button onClick={() => sortModalVisibility.toggle()}>
              Confirm
            </Button>,
          ]}
          onOk={() => {
            sortModalVisibility.setFalse();
          }}
        >
          <Typography.Title level={5}>
            Sorting Option{" "}
            <Tooltip title="Only one Option at the same time">
              <QuestionCircleOutlined />
            </Tooltip>
          </Typography.Title>
          <Row gutter={[16, 16]} className="w-full">
            {sortOptions.map((sortOption, index) => (
              <Col span={24} key={index}>
                <SortMenu
                  label={sortOption.label}
                  options={sortOption.options}
                  onSelectionChange={(selectedOption) =>
                    handleSortChange(sortOption.name, selectedOption, index)
                  }
                  isReset={isReset && lastChangedIndex.current !== index}
                  onReset={() => setIsReset(false)}
                />
              </Col>
            ))}
          </Row>
        </Modal>

        <FloatButton.Group style={{ bottom: 20, left: 20 }}>
          <FloatButton
            icon={<SortAscendingOutlined />}
            onClick={() => sortModalVisibility.toggle()}
            tooltip="Sort Products"
            style={{ width: "2rem" }}
          />
          <FloatButton
            icon={<ControlOutlined />}
            onClick={() => filterModalVisibility.toggle()}
            tooltip="Filter Products"
          />
        </FloatButton.Group>
      </div>
    );
  };

  return { selectedSort, selectedFilter, renderSelectSortMenu };
};
