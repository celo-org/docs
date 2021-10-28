import React, { useCallback, useState } from 'react';
import Card from './components/Card';
import styles from './styles.module.css';
import BulletItem from './components/BulletItem';
import { useWindowSize } from '../../../../../../hooks/useWindowSize';
import { useSwipeable } from 'react-swipeable';

export interface CardInterface {
  title: string;
  description: string;
  imagePath: string;
  to: string;
}

export type Props = { cards: CardInterface[]; startIndex?: number };

const Cards: React.FC<Props> = (props) => {
  const { cards } = props;
  const startIndex =
    props.startIndex && props.startIndex < cards.length
      ? props.startIndex
      : Math.floor(cards.length / 2);
  const { windowWidth } = useWindowSize();
  const [index, setIndex] = useState(startIndex);
  const cardDimensions = {
    width: 400,
    height: windowWidth >= 768 ? 600 : 450,
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < cards.length - 1) setIndex(index + 1);
      else setIndex(0);
    },
    onSwipedRight: () => {
      if (index > 0) setIndex(index - 1);
      else setIndex(cards.length - 1);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const getCardProps = useCallback(
    (
      i: number
    ): {
      translateX: number;
      zIndex: number;
      opacity: number;
      scale: number;
    } => {
      const { width } = cardDimensions;

      // Card 2 Left
      if (i - 2 === index || i + (cards.length - 2) === index) {
        return {
          translateX: width / 2 + width / 40,
          zIndex: 0,
          opacity: windowWidth > 996 ? 1 : 0,
          scale: 0.75,
        };
      }

      // Card 1 Left
      if (i - 1 === index || i + (cards.length - 1) === index) {
        return {
          translateX: width / 4,
          zIndex: 1,
          opacity: windowWidth > width + width / 2 ? 1 : 0,
          scale: 0.85,
        };
      }

      // Centered Card
      if (i === index) {
        return {
          translateX: 0,
          zIndex: 2,
          opacity: 1,
          scale: 1,
        };
      }

      // Card 1 Right
      if (i + 1 === index || i - (cards.length - 1) === index) {
        return {
          translateX: -width / 4,
          zIndex: 1,
          opacity: windowWidth > width + width / 2 ? 1 : 0,
          scale: 0.85,
        };
      }

      // Card 2 Right
      if (i + 2 === index || i - (cards.length - 2) === index) {
        return {
          translateX: -width / 2 - width / 40,
          zIndex: 0,
          opacity: windowWidth > 996 ? 1 : 0,
          scale: 0.75,
        };
      }

      return {
        translateX: 0,
        zIndex: -1,
        opacity: 0,
        scale: 0.75,
      };
    },
    [index, cardDimensions, windowWidth]
  );

  return (
    <div className={styles.Container} {...handlers}>
      <div
        className={styles.Slider}
        style={{
          // Sizes of Card to properly center them, because the Cards are absolute
          height: cardDimensions.height,
          width:
            windowWidth * 0.95 > cardDimensions.width
              ? cardDimensions.width || '100%'
              : '100%',
        }}>
        {cards.map((card, i) => {
          const cardProps = getCardProps(i);
          return (
            <div
              key={card.title}
              className={styles.Item}
              style={{
                transform: `translateX(${cardProps.translateX}px) scale(${cardProps.scale})`,
                opacity: cardProps.opacity,
                zIndex: cardProps.zIndex,
                cursor: i === index ? 'auto' : 'pointer',
              }}
              onClick={() => {
                setIndex(i);
              }}>
              <Card
                data={card}
                active={i === index}
                width={
                  windowWidth * 0.95 > cardDimensions.width
                    ? cardDimensions.width || '100%'
                    : '100%'
                }
                height={cardDimensions.height}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.BulletContainer}>
        {cards.map((card, i) => (
          <BulletItem
            key={card.title}
            active={i === index}
            onClick={() => {
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
