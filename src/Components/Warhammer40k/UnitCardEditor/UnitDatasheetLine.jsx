import { DeleteFilled, SettingOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Dropdown, Input, Menu, Popconfirm, Space, Switch, Typography } from "antd";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCardStorage } from "../../../Hooks/useCardStorage";
import { getByPlaceholderText } from "@testing-library/react";

export function UnitDatasheetLine({ sheet, index }) {
  const { activeCard, updateActiveCard } = useCardStorage();
  const [dropdownVisible, setDropdownVisible] = useState();

  const handleSheetChange = (event, index) => {
    const newDatasheets = [...activeCard.datasheet];
    newDatasheets[index][event.target.name] = event.target.value;
    updateActiveCard({ ...activeCard, datasheet: newDatasheets });
  };

  return (
    <Card
      key={`sheet-${sheet.datasheet_id}-${index}`}
      type={"inner"}
      size={"small"}
      title={
        <Typography.Text
          editable={{
            onChange: (value) => {
              const newDatasheets = [...activeCard.datasheet];
              newDatasheets[index]["name"] = value;
              updateActiveCard({
                ...activeCard,
                datasheet: newDatasheets,
              });
            },
          }}>
          {sheet.name}
        </Typography.Text>
      }
      bodyStyle={{ padding: 0 }}
      style={{ marginBottom: "16px" }}
      extra={
        <Space>
          <Dropdown
            visible={dropdownVisible}
            onVisibleChange={(flag) => setDropdownVisible(flag)}
            placement={'bottomRight'}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Checkbox
                    checked={sheet.showHeader}
                    disabled={!sheet.active}
                    onChange={(value) => {
                      updateActiveCard(() => {
                        const newDatasheets = [...activeCard.datasheet];
                        newDatasheets[index]["showHeader"] = value.target.checked;
                        return { ...activeCard, datasheet: newDatasheets };
                      });
                    }}>
                    Show header
                  </Checkbox>
                </Menu.Item>
              </Menu>
            }>
            <Button type="icon" shape="circle" size="small" icon={<SettingOutlined />}></Button>
          </Dropdown>

          <Popconfirm
            title={"Are you sure you want to delete this datasheet?"}
            placement="topRight"
            onConfirm={(value) =>
              updateActiveCard(() => {
                const newDatasheets = [...activeCard.datasheet];
                newDatasheets.splice(index, 1);
                return { ...activeCard, datasheet: newDatasheets };
              })
            }>
            <Button type="icon" shape="circle" size="small" icon={<DeleteFilled />}></Button>
          </Popconfirm>
          <Switch
            checked={sheet.active}
            onChange={(value) =>
              updateActiveCard(() => {
                const newDatasheets = [...activeCard.datasheet];
                newDatasheets[index]["active"] = value;
                return { ...activeCard, datasheet: newDatasheets };
              })
            }
          />
        </Space>
      }>
      {sheet.active && (
        <div>
          <div className="editor labels edit_heading">
            <div className="center label">
              <div className="movement icon" title="Movement" alt-text="Movement"></div>
            </div>
            <div className="center label">
              <div className="weaponskill icon" title="Weapon Skill" alt-text="Weapon Skill"></div>
            </div>
            <div className="center label">
              <div className="ballisticskill icon" title="Ballistic Skill" alt-text="Ballistic Skill"></div>
            </div>
            <div className="center label">
              <div className="strength icon" title="Strength" alt-text="Strength"></div>
            </div>
            <div className="center label">
              <div className="toughness icon" title="Toughness" alt-text="Toughness"></div>
            </div>
            <div className="center label">
              <div className="wounds icon" title="Wounds" alt-text="Wounds"></div>
            </div>
            <div className="center label">
              <div className="attacks icon" title="Attacks" alt-text="Attacks"></div>
            </div>
            <div className="center label">
              <div className="leadership icon" title="Leadership" alt-text="Leadership"></div>
            </div>
            <div className="center label">
              <div className="save icon" title="Save" alt-text="Save"></div>
            </div>
            <div className="center label">
              <div className="inv icon" title="Invulnerable" alt-text="Save"></div>
            </div>
          </div>
          <div className="labels edit_line">
            <div className="center label">
              <Input type="text" value={sheet.M} name="M" onChange={(e) => handleSheetChange(e, index)} />
            </div>
            <div className="center label">
              <Input type="text" value={sheet.WS} name="WS" onChange={(e) => handleSheetChange(e, index)} />
            </div>
            <div className="center label">
              <Input type="text" value={sheet.BS} name="BS" onChange={(e) => handleSheetChange(e, index)} />
            </div>
            <div className="center label">
              <Input type="text" value={sheet.S} name="S" onChange={(e) => handleSheetChange(e, index)} />
            </div>
            <div className="center label">
              <Input type="text" value={sheet.T} name="T" onChange={(e) => handleSheetChange(e, index)} />
            </div>
            <div className="center label">
              <Input type="text" value={sheet.W} name="W" onChange={(e) => handleSheetChange(e, index)} />
            </div>
            <div className="center label">
              <Input type="text" value={sheet.A} name="A" onChange={(e) => handleSheetChange(e, index)} />
            </div>
            <div className="center label">
              <Input type="text" value={sheet.Ld} name="Ld" onChange={(e) => handleSheetChange(e, index)} />
            </div>
            <div className="center label">
              <Input type="text" value={sheet.Sv} name="Sv" onChange={(e) => handleSheetChange(e, index)} />
            </div>
            <div className="center label">
              <Input type="text" value={sheet.Inv} name="Inv" onChange={(e) => handleSheetChange(e, index)} />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}