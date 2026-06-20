import { Button, Modal } from 'jeisson-rodriguez-resume';

// Modal is a fixed, full-viewport overlay by design (position: fixed; inset:
// 0) — two stories stacking would just paint over each other, so this card
// has a single representative composition (cfg.overrides.Modal pins it as
// the "single" cardMode primary story; see .design-sync/config.json).
export function Confirm() {
    return (
        <Modal isOpen title="Confirm" onClose={() => {}}>
            <p>Are you sure you want to delete this experiment?</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <Button variant="primary">Delete</Button>
                <Button variant="ghost">Cancel</Button>
            </div>
        </Modal>
    );
}
