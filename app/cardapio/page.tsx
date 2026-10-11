"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./cardapio.module.css";

const WHATSAPP_NUMBER = "5592993661404";

const menu = [
  {
    name: "Cafés e bebidas",
    items: [
      ["Café preto", 5], ["Café com leite", 6], ["Nescau", 7],
      ["Suco de maracujá · 300 ml", 14], ["Suco de goiaba", 12],
      ["Suco de acerola", 10], ["Coco gelado", 7], ["Água mineral", 5],
    ] as const,
  },
  {
    name: "Chás amazônicos",
    items: [
      ["Chá de capim-santo", 5], ["Chá mate", 8], ["Chá de canela", 6],
      ["Chá de camomila", 8], ["Chá de frutas vermelhas", 8],
      ["Chá de hortelã", 8], ["Chá hibisco", 8], ["Rosa silvestre", 8],
      ["Chá maçã e canela", 8],
    ] as const,
  },
  {
    name: "Tapiocas",
    items: [
      ["Tapioca com manteiga", 6], ["Tapioca com banana", 12],
      ["Tapioca com queijo e banana", 15], ["Tapioca com tucumã e queijo", 15],
      ["Tapioca com tucumã, queijo e banana", 27],
      ["Tapioca com banana e tucumã", 21],
    ] as const,
  },
  {
    name: "Farofas regionais",
    items: [
      ["Farofa de camarão", 32], ["Farofa de charque", 35],
      ["Farofa de conserva", 25], ["Farofa de ovo", 15],
      ["Farofa de calabresa", 22],
    ] as const,
  },
  {
    name: "Porções regionais",
    items: [
      ["Caju-roxo", 12], ["Macaxeira", 12], ["Banana cozida", 14],
      ["Batata-doce", 12], ["Mamão", 12],
    ] as const,
  },
  {
    name: "Pães e sanduíches",
    items: [
      ["X-cabaquim", 30], ["Pão com tucumã e queijo", 25],
      ["Pão com banana e queijo", 20], ["Pão com ovo", 6],
      ["Pão com presunto", 12], ["Misto quente", 12],
      ["Pão de queijo · unidade", 2],
    ] as const,
  },
  {
    name: "Bolos e doces",
    items: [
      ["Bolo pequeno com cobertura", 50], ["Mini bolo", 25],
      ["Iogurte natural com fruta", 15], ["Cuscuz com queijo", 14],
      ["Cuscuz com charque", 15], ["Cuscuz tradicional", 8],
    ] as const,
  },
];

type MenuItemName = (typeof menu)[number]["items"][number][0];
type Quantities = Partial<Record<MenuItemName, number>>;

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const today = new Date();
const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

function isOpenDay(date: string) {
  if (!date) return false;
  const [year, month, day] = date.split("-").map(Number);
  const weekday = new Date(year, month - 1, day, 12).getDay();
  return weekday === 0 || weekday === 5 || weekday === 6;
}

export default function CardapioPage() {
  const [quantities, setQuantities] = useState<Quantities>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("");
  const [formError, setFormError] = useState("");
  const [orderPanelVisible, setOrderPanelVisible] = useState(false);
  const orderPanelRef = useRef<HTMLElement>(null);

  const order = useMemo(() => menu.flatMap((section) => section.items.flatMap(([name, price]) => {
    const quantity = quantities[name] ?? 0;
    return quantity > 0 ? [{ name, price, quantity }] : [];
  })), [quantities]);

  const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = order.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const panel = orderPanelRef.current;
    if (!panel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setOrderPanelVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  function changeQuantity(name: MenuItemName, delta: number) {
    setQuantities((current) => {
      const next = Math.max(0, (current[name] ?? 0) + delta);
      return { ...current, [name]: next };
    });
  }

  function openCheckout() {
    setCheckoutOpen(true);
    orderPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function sendReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!isOpenDay(date)) {
      setFormError("Escolha uma sexta, sábado ou domingo para solicitar a reserva.");
      return;
    }

    const data = new FormData(form);
    const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
      weekday: "long", day: "2-digit", month: "long", year: "numeric",
    });
    const lines = [
      "Olá! Gostaria de solicitar uma reserva no Portal do Japão.",
      "",
      `Nome: ${data.get("name")}`,
      `Telefone para contato: ${data.get("phone")}`,
      `Data: ${formattedDate}`,
      `Horário: ${period}`,
      `Pessoas: ${data.get("people")}`,
      `Forma de pagamento preferida: ${data.get("payment")}`,
      "",
      "Pedido:",
      ...order.map((item) => `• ${item.quantity}x ${item.name} — ${currency.format(item.price * item.quantity)}`),
      `Total estimado: ${currency.format(total)}`,
      data.get("notes") ? `Observações: ${data.get("notes")}` : "",
      "",
      "Sei que esta é uma solicitação e aguardo a confirmação da equipe. O pagamento será combinado pelo WhatsApp.",
    ].filter(Boolean);

    setFormError("");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <div className={styles.menuColumn}>
          <div className={styles.menuHeading}>
            <h1>Cardápio</h1>
          </div>
          {menu.map((section, index) => (
            <section className={styles.menuSection} key={section.name}>
              <div className={styles.sectionTitle}>
                <span className={styles.sectionIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.name}</h2>
              </div>
              <ul className={styles.itemList}>
                {section.items.map(([name, price]) => {
                  const quantity = quantities[name] ?? 0;
                  return (
                    <li className={styles.menuItem} key={name}>
                      <div className={styles.itemCopy}><span>{name}</span><strong>{currency.format(price)}</strong></div>
                      <div className={styles.quantityControl} aria-label={`Quantidade de ${name}`}>
                        <button type="button" onClick={() => changeQuantity(name, -1)} disabled={quantity === 0} aria-label={`Remover ${name}`}>−</button>
                        <span aria-live="polite">{quantity}</span>
                        <button type="button" onClick={() => changeQuantity(name, 1)} aria-label={`Adicionar ${name}`}>+</button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <aside className={styles.orderPanel} id="pedido" ref={orderPanelRef}>
          <div className={styles.orderTopline}><span>Seu pedido</span><span className={styles.orderCount}>{itemCount}</span></div>
          {order.length === 0 ? (
            <div className={styles.emptyOrder}><span className={styles.emptyIcon}>＋</span><p>Nenhum item selecionado</p></div>
          ) : (
            <ul className={styles.orderList}>
              {order.map((item) => (
                <li key={item.name}>
                  <span>{item.quantity} × {item.name}</span>
                  <strong>{currency.format(item.price * item.quantity)}</strong>
                </li>
              ))}
            </ul>
          )}
          <div className={styles.totalLine}><span>Total estimado</span><strong>{currency.format(total)}</strong></div>
          <p className={styles.estimateNote}>O valor final e a disponibilidade são confirmados pela equipe.</p>

          {!checkoutOpen ? (
            <button className={styles.checkoutButton} type="button" disabled={!itemCount} onClick={() => setCheckoutOpen(true)}>
              Continuar para a reserva <span aria-hidden="true">→</span>
            </button>
          ) : (
            <form className={styles.bookingForm} onSubmit={sendReservation}>
              <label>Seu nome<input name="name" autoComplete="name" placeholder="Nome e sobrenome" required /></label>
              <div className={styles.formGrid}>
                <label>Telefone<input name="phone" type="tel" autoComplete="tel" placeholder="(92) 99999-9999" required /></label>
                <label>Pessoas<input name="people" type="number" min="1" max="40" defaultValue="2" required /></label>
              </div>
              <label>Data da visita<input name="date" type="date" min={minDate} value={date} onChange={(event) => { setDate(event.target.value); setFormError(""); }} required /></label>
              <fieldset className={styles.periodField}>
                <legend>Período</legend>
                <div className={styles.periodOptions}>
                  {["Manhã · 7h às 11h", "Tarde · 15h às 18h"].map((option) => (
                    <label className={period === option ? styles.periodSelected : ""} key={option}>
                      <input type="radio" name="period" value={option} checked={period === option} onChange={(event) => setPeriod(event.target.value)} required />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label>Forma de pagamento preferida
                <select name="payment" defaultValue="" required>
                  <option value="" disabled>Selecione uma opção</option>
                  <option>Pix</option><option>Cartão de crédito</option><option>Cartão de débito</option><option>Dinheiro</option>
                </select>
              </label>
              {date && !isOpenDay(date) && <p className={styles.formError}>As reservas são recebidas para sexta, sábado e domingo.</p>}
              {formError && <p className={styles.formError}>{formError}</p>}
              <button className={styles.checkoutButton} type="submit">Enviar pedido pelo WhatsApp <span aria-hidden="true">↗</span></button>
              <p className={styles.confirmationNote}>Reserva pendente de confirmação. Pagamento combinado pelo WhatsApp.</p>
            </form>
          )}
        </aside>
      </div>
      {itemCount > 0 && !orderPanelVisible && (
        <div className={styles.mobileCheckoutBar}>
          <div className={styles.mobileCheckoutSummary}>
            <span>{itemCount} {itemCount === 1 ? "item" : "itens"}</span>
            <strong>{currency.format(total)}</strong>
          </div>
          <button type="button" onClick={openCheckout}>
            Continuar <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </main>
  );
}