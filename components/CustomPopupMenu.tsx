import { useState, useRef, ReactNode } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';

type TSize = {
  width: number;
  height: number;
};

type CustomPopupMenuProps = {
  triggerChild: ReactNode;
  children: ReactNode;
};

const CustomPopupMenu = ({ triggerChild, children }: CustomPopupMenuProps) => {
  const dimension = useWindowDimensions();
  const [visible, setVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [contentSize, setContentSize] = useState<TSize | null>(null);
  const triggerRef = useRef<View>(null);

  const toggleMenu = () => {
    if (!visible) {
      triggerRef.current?.measureInWindow((x, y, _, height) => {
        const shouldPlaceAboveTrigger =
          dimension.height - (y + height) - (contentSize?.height ?? 0) <= 0;

        setMenuPosition({
          top: y + height - (shouldPlaceAboveTrigger ? (contentSize?.height ?? 0) : 0), // Place menu below the button
          left: x - (contentSize?.width ?? 0) + 20, // Align menu with the button's left edge
        });

        setVisible(true);
      });
    } else {
      setVisible(false);
    }
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;

    if (contentSize === null) {
      setContentSize({
        width: layout.width,
        height: layout.height,
      });
    }
  };

  return (
    <View className='relative'>
      {/* Button to open popup menu */}
      <TouchableOpacity ref={triggerRef} onPress={toggleMenu}>
        {triggerChild}
      </TouchableOpacity>

      {/* Popup Menu */}
      {visible && (
        <Modal
          transparent={true}
          visible={visible}
          animationType='fade'
          onRequestClose={() => setVisible(false)} // Close menu on back button press
        >
          <Pressable
            style={styles.overlay}
            onPress={() => setVisible(false)} // Close menu on tapping outside
          >
            <View
              style={[
                styles.popupMenu,
                { position: 'absolute', top: menuPosition.top, left: menuPosition.left },
              ]}
              onLayout={handleContentLayout}
            >
              {children}
            </View>
          </Pressable>
        </Modal>
      )}

      {contentSize === null && (
        <View style={[styles.popupMenu, styles.hidden]} onLayout={handleContentLayout}>
          {children}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  popupMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  hidden: {
    opacity: 0,
    zIndex: -1,
  },
});

export default CustomPopupMenu;
